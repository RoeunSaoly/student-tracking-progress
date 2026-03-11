import AuthLayout from '../components/AuthLayout';
import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  const sideContent = (
    <div className="text-center lg:text-left">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome
        <br />
        toour platform..
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        Lorem faclorul non egestur quis pro nam his
        <br />
        ecurrit dictum nela dictuur. Track your progress
        <br />
        and achieve your study goals with our
        <br />
        comprehensive platform.
      </p>
    </div>
  );

  return (
    <AuthLayout sideContent={sideContent}>
      <SignUpForm />
    </AuthLayout>
  );
}