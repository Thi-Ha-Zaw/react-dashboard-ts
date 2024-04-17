
const DashboardTitle = ({title} : {title : string}) => {
    return (
        <div className="flex items-center mb-2">
            <h1 className="text-lg font-semibold md:text-2xl dark:text-gray-50">{title}</h1>
        </div>
    );
};

export default DashboardTitle;
