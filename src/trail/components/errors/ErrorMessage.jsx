import "./css/ErrorMessage.css";

export default function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-container">
            <p className="error-text">❌ {message}</p>

            {onRetry && (
                <button className="error-button" onClick={onRetry}>
                    Retry
                </button>
            )}
        </div>
    );
}
