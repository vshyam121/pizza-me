import { useEffect } from "react";
import { withRouter } from "react-router-dom";

/* Scroll to top of page when it is loaded */
const ScrollToTop = ({history, children}) => {
    useEffect(() => {
        history.listen(() => {
            window.scrollTo(0,0);
        })
    }, [history]);
    return children;
}

export default withRouter(ScrollToTop);