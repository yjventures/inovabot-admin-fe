import { useSidebarStore } from "@/store/store"
import { Outlet } from "react-router-dom"

const BasicLayout = () => {
    const darkMode = useSidebarStore(state => state.darkMode)

    return (
        <div className={`${darkMode && 'dark'}`}>
            <Outlet />
        </div>
    )
}

export default BasicLayout