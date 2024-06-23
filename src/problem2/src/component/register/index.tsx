import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.sass";
import { registerUser } from "../../auth/authActions";

export default function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore: Unreachable code error
    dispatch(registerUser(formData)); //
    // alert(`Name: ${formData.email}, Email: ${formData.password}`);
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="relative flex min-h-full shrink-0 justify-center md:px-12 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
        <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <h2 className="mt-20 text-lg font-semibold text-gray-900">
            Get started for free
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Already registered?{" "}
            <a
              className="font-medium text-blue-600 hover:underline"
              href="/login"
            >
              Sign in
            </a>{" "}
            to your account.
          </p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
          >
            <div className="col-span-full">
              <label className="mb-3 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                value={formData.name}
                onChange={handleChange}
                id=":S1:"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                type="text"
                name="name"
              />
            </div>
            <div className="col-span-full">
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                value={formData.email}
                onChange={handleChange}
                id=":S3:"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                type="email"
                name="email"
              />
            </div>
            <div className="col-span-full">
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                value={formData.password}
                onChange={handleChange}
                id=":S4:"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                type="password"
                name="password"
              />
            </div>
            <div className="col-span-full">
              <button
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
                type="submit"
                color="blue"
              >
                <span>
                  Sign up <span aria-hidden="true">→</span>
                </span>
              </button>
            </div>
          </form>
        </main>
      </div>
      <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
        <img
          alt=""
          loading="lazy"
          width="1664"
          height="1866"
          decoding="async"
          data-nimg="1"
          className="absolute inset-0 h-full w-full object-cover"
          src="/background-auth.4bcf3f4b.jpg"
        />
      </div>
    </div>
  );
}
