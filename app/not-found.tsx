import BackButton from '@/app/ui/ui_utils/backButton';

export default function NotFound() {
    return (
        <div>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <BackButton />
        </div>
    );
};
