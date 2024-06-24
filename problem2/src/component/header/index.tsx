import { useEffect } from "react";
import { Link } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import has from "lodash/has";
import get from "lodash/get";

import { useGetUserDetailsQuery } from "../../auth/authService";
import { setCredentials } from "../../auth/authSlice";

import "./styles.sass";

export default function Header() {
  // @ts-ignore: Unreachable code error
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="relative z-50 flex justify-between">
        <div className="flex items-center md:gap-x-12">
          <div className="hidden md:flex md:gap-x-6">
            <a
              className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="#features"
            >
              Features
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="#testimonials"
            >
              Testimonials
            </a>
          </div>
        </div>
        <div className="flex items-center gap-x-5 md:gap-x-8">
          {!has(userInfo, "email") ? (
            <>
              <div className="hidden md:block">
                <Link
                  className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/login"
                >
                  Sign in
                </Link>
              </div>
              <Link
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                color="blue"
                href="/register"
              >
                <span>
                  Get started <span className="hidden lg:inline">today</span>
                </span>
              </Link>
            </>
          ) : (
            <p className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
              {get(userInfo, "email")}
            </p>
          )}
        </div>
      </nav>
    </div>
  );
}
