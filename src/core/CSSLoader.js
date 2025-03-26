class CSSLoader {
    static styles = new Map();
    static cssCache = new Map(); // 고도화 전략

    // 컴포넌트의 스타일 등록 (핵심)
    static async registerComponentStyles(component) {
        const componentId = component.componentId;

        if (this.styles.has(componentId)) {
            // 이미 처리된 컴포넌트 스타일인지 확인
            return;
        }

        try {
            // CSS 파일 로딩 시도
            const cssContent = await this.loadCssFile(component.constructor.name);

            if (cssContent) {
                // CSS 파일이 로드된 경우
                this.processAndInjectStyles(cssContent, componentId);
            } else {
                // CSS 파일이 없는 경우 getCssModule 사용
                const cssModule = component.constructor.getCssModule ?
                    component.constructor.getCssModule() : {};
                const generatedCss = this.generateCssFromModule(cssModule, componentId);
                if (generatedCss) {
                    this.injectStyles(generatedCss, componentId);
                }
            }

            // 등록 완료 표시
            this.styles.set(componentId, true);
        } catch (error) {
            console.error(`스타일 로드 중 오류 발생: ${error}`);

            // 오류 발생 시 getCssModule 사용
            const cssModule = component.constructor.getCssModule ?
                component.constructor.getCssModule() : {};
            const generatedCss = this.generateCssFromModule(cssModule, componentId);
            if (generatedCss) {
                this.injectStyles(generatedCss, componentId);
            }

            // 등록 완료 표시
            this.styles.set(componentId, true);
        }
    }

    // CSS 파일 로드 시도
    static async loadCssFile(componentName) {
        const cssPath = `/styles/${componentName}.css`; // CSS 파일 경로 규칙

        // 캐시 확인
        if (this.cssCache.has(cssPath)) {
            return this.cssCache.get(cssPath);
        }

        try {
            const response = await fetch(cssPath);
            if (!response.ok) {
                return null; // 파일이 없으면 null 반환
            }
            const cssText = await response.text();
            this.cssCache.set(cssPath, cssText); // 캐시에 저장
            return cssText;
        } catch (error) {
            console.warn(`CSS 파일 로드 실패: ${cssPath}`, error);
            return null;
        }
    }

    // CSS 파일 내용 가공 및 주입
    static processAndInjectStyles(cssText, componentId) {
        // CSS 파일 내용을 가공하여 클래스명 프리픽스 추가
        const processedCss = cssText.replace(/\.([a-zA-Z0-9_-]+)(\s*[,{:])/g, (match, className, suffix) => {
            // 이미 컴포넌트 프리픽스가 있으면 건너뜀
            if (className.startsWith(`${componentId}__`)) {
                return match;
            }

            // 가상 선택자 처리 (:hover, :focus 등)
            if (suffix === ':') {
                return `.${componentId}__${className}${suffix}`;
            }

            return `.${componentId}__${className}${suffix}`;
        });

        this.injectStyles(processedCss, componentId);
    }

    // 모듈 객체에서 CSS 콘텐츠 생성
    static generateCssFromModule(cssModule, componentId) {
        if (!cssModule || Object.keys(cssModule).length === 0) {
            return '';
        }

        // 모듈 객체를 프리픽스된 클래스 이름이 있는 CSS 문자열로 변환
        return Object.entries(cssModule).map(([selector, rules]) => {
            // 선택자에 컴포넌트 프리픽스 추가
            let prefixedSelector;

            if (selector.includes(':')) {
                // 가상 선택자 처리
                const [base, pseudo] = selector.split(':');
                prefixedSelector = `.${componentId}__${base}:${pseudo}`;
            } else {
                prefixedSelector = `.${componentId}__${selector}`;
            }

            // CSS 규칙 형식 지정
            const cssRules = typeof rules === 'object'
                ? Object.entries(rules).map(([prop, value]) => `  ${prop}: ${value};`).join('\n')
                : rules; // rules가 이미 문자열인 경우

            // 완전한 CSS 규칙 세트 반환
            return `${prefixedSelector} {\n${cssRules}\n}`;
        }).join('\n\n');
    }

    // 스타일 DOM에 주입
    static injectStyles(cssContent, componentId) {
        if (!cssContent) return;

        const styleId = `style-${componentId}`;

        // 이미 존재하는지 확인
        if (document.getElementById(styleId)) {
            return;
        }

        // 스타일 요소 생성 및 추가
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.textContent = cssContent;
        document.head.appendChild(styleEl);
    }

    // 특정 컴포넌트의 스타일 제거
    static removeComponentStyles(componentId) {
        const styleId = `style-${componentId}`;
        const styleEl = document.getElementById(styleId);

        if (styleEl) {
            document.head.removeChild(styleEl);
            this.styles.delete(componentId);
        }
    }

    // 글로벌 스타일 로드 (컴포넌트와 무관한 전역 스타일)
    static async loadGlobalStyles(cssPath) {
        try {
            // 캐시 확인
            if (this.cssCache.has(cssPath)) {
                const cachedCss = this.cssCache.get(cssPath);
                this.injectGlobalStyles(cachedCss, cssPath);
                return;
            }

            const response = await fetch(cssPath);
            if (!response.ok) {
                console.warn(`글로벌 CSS 파일 로드 실패: ${cssPath}`);
                return;
            }

            const cssText = await response.text();
            this.cssCache.set(cssPath, cssText);
            this.injectGlobalStyles(cssText, cssPath);
        } catch (error) {
            console.error(`글로벌 스타일 로드 중 오류 발생: ${error}`);
        }
    }

    // 글로벌 스타일 주입
    static injectGlobalStyles(cssContent, cssPath) {
        if (!cssContent) return;

        const styleId = `style-global-${cssPath.replace(/[^a-zA-Z0-9]/g, '-')}`;

        // 이미 존재하는지 확인
        if (document.getElementById(styleId)) {
            return;
        }

        // 스타일 요소 생성 및 추가
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.textContent = cssContent;
        document.head.appendChild(styleEl);
    }
}

export default CSSLoader;