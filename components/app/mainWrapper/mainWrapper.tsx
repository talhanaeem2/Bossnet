import MainHeader from "../mainHeader/mainHeader"
import Footer from "../footer/footer"
import SafeAreaViewComponent from "../common/SafeAreaViewComponent/SafeAreaViewComponent";
import MainWrapperProps from "./interfaces/mainWrapperProps";

const MainWapper = (props: MainWrapperProps) => {
    const { isHeader = true, isFooter = true } = props
    return (
        <SafeAreaViewComponent>
            {
                isHeader ?
                    <MainHeader
                        headerText={props.headerText}
                        chatHeader={props.chatHeader}
                        icon={props.icon}
                    /> :
                    null
            }
            {props.children}
            {isFooter && <Footer />}
        </SafeAreaViewComponent>
    )
}

export default MainWapper