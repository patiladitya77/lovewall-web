"use client";
import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="">
      <div className="navbar bg-base-300 shadow-sm ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">LoveWall</a>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.imageUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <SignedIn>
                  <SignOutButton>
                    <button className="w-full text-left">Logout</button>
                  </SignOutButton>
                </SignedIn>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
