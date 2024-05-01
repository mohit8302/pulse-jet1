import { AppBar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Spinner } from "../components/spinner";
// import { useBlogs, useDashboard } from "../hooks";
// import Dashboard from "./Dashboard/Dashboard";

export const Dashboards = () => {
    const { loading, dash } = useDashboard();

    if (loading) {
        return <div>
            <Headers /> 
            <div  className="flex justify-center">
                <div>
                    <Spinner />
                </div>
            </div>
        </div>
    }

    return <div>
         <Headers />
         <Dashboard/>
    </div>
}