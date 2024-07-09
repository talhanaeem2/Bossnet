import Footer from "../footer/footer"
import SafeAreaViewComponent from "../common/SafeAreaViewComponent/SafeAreaViewComponent";
import MainWrapperProps from "./interfaces/mainWrapperProps";
import AppHeader from "../appHeader/appHeader";

const MainWapper = (props: MainWrapperProps) => {
    const { isFooter = true } = props
    return (
        <SafeAreaViewComponent>
            {props.children}
            {isFooter && <Footer />}
        </SafeAreaViewComponent>
    )
}

export default MainWapper