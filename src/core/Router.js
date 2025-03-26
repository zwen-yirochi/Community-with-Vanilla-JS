class Router {
    static routes = {};
    static container = null;
    static currentPage = null;

    static setContainer(element) {
        this.container = element;
    }

    static addRoute(path, PageComponent) {
        this.routes[path] = PageComponent;
    }

    static init() {
        window.addEventListener('hashchange', () => this.handleRoute());

        // 초기 라우트 처리
        this.handleRoute();

        // 앵커 태그 클릭 이벤트 위임
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('a') && e.target.href) {
                if (e.target.getAttribute('href').startsWith('#')) {
                    return;
                }
                e.preventDefault();
                const url = new URL(e.target.href);
                this.navigate(url.pathname);
            }
        });
    }

    static navigate(path) {
        if (path && path[0] !== '/') {
            path = '/' + path;
        }
        window.location.hash = path;
    }

    static handleRoute() {
        let path = window.location.hash.substring(1) || '/';
        if (path && path[0] !== '/') {
            path = '/' + path;
        }

        // 경로에 맞는 페이지 컴포넌트 찾기
        console.log(path, "in handle route");
        const PageComponent = this.routes[path] || this.routes['*'];

        // 기존 페이지 정리
        if (this.currentPage && typeof this.currentPage.unmount === 'function') {
            this.currentPage.unmount();
        }

        // 컨테이너 비우기
        this.container.innerHTML = '';

        // 새 페이지 생성
        this.currentPage = new PageComponent(this.container);
    }
}

export default Router;