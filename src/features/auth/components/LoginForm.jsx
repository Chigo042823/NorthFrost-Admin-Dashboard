export const LoginForm = ({onSubmit}) => {

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <div>
                <label className="block text-sm font-medium text-stone-600">Email</label>
                <input
                type="text"
                name="email"
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">Password</label>
                <input
                type="password"
                name="password"
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="mt-3 px-4 py-2 rounded-md w-full bg-indigo-500 text-white hover:bg-indigo-600"
            >
                Log in
            </button>
        </form>
    )
}