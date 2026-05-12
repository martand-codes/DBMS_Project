import { Wallet } from "lucide-react";

const Navbar = ({ balance }) => {

    return (

        <nav className="w-full bg-slate-900 text-white shadow-md">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">

                    <div className="bg-green-500 p-2 rounded-xl">
                        <Wallet size={24} />
                    </div>

                    <div>

                        <h1 className="text-2xl font-bold">
                            Finance Tracker
                        </h1>

                        <p className="text-sm text-slate-400">
                            Track your income & expenses
                        </p>

                    </div>

                </div>

                {/* Balance */}
                <div className="hidden md:flex items-center gap-3">

                    <div className="bg-slate-800 px-4 py-2 rounded-lg">

                        <p className="text-sm text-slate-400">
                            Current Balance
                        </p>

                        <h2 className="text-lg font-semibold text-green-400">
                            ₹ {balance}
                        </h2>

                    </div>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;
