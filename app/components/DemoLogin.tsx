export const DemoLogin = ({ onContinue }: { onContinue: () => void }) => (
    <div className="demo-login">
        <h3>Try the Demo</h3>
        <p>Click below to continue as a guest user</p>
        <button className="button button-primary" onClick={onContinue}>
            Continue as Guest
        </button>
    </div>
);