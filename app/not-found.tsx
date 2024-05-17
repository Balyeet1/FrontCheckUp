import BackButton from './ui/ui_utils/backButton';

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl">Pgae not found</h1>
            <div>
                <BackButton />
            </div>
        </div>
    );
};
