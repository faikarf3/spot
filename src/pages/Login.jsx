import React from 'react';

function Login() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-md mx-auto text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-6">Login</h1>
				<p className="text-lg text-gray-600 mb-8">
					Welcome back! Please sign in to your account.
				</p>
				<a
					href="/"
					className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
				>
					Back to Home
				</a>
			</div>
		</div>
	);
}

export default Login;
