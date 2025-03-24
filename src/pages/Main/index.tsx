import KanbanBoard from './components/KanbanBoard';
import ResetBoard from './components/KanbanBoard/ResetBoard';

const MainPage = () => {
    return (
        <div className="min-h-screen sm:overflow-y-hidden flex flex-col gap-10 p-[40px] max-sm:px-[20px]">
            <ResetBoard />
            <KanbanBoard />
        </div>
    );
};

export default MainPage;
