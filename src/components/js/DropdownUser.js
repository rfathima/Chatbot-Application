import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UserOne from '../images/user-icon.jpg';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-md font-bold text-black dark:text-white username">
            Razul
          </span>
          <span className="block text-xs font-bold text-red-600">Front Developer</span>
        </span>

        <span>
          <img className="rounded-full w-[45px] h-[45px] p-1" src={UserOne} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block dropdown"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-72.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 pt-6 pb-6 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-red-600 lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                  fill=""
                />
                <path
                  d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                  fill=""
                />
              </svg>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-red-600 lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.0281 12.15V9.88748H18.8969C18.6844 8.86873 18.2344 7.90936 17.6031 7.09061L18.9469 5.74686L17.2531 4.05311L15.9094 5.39686C15.0906 4.76561 14.1312 4.31561 13.1125 4.10311V2.02811H10.85V4.15936C9.83123 4.37186 8.87185 4.82186 8.0531 5.45311L6.70935 4.10936L5.0156 5.80311L6.35935 7.14686C5.7281 7.96561 5.2781 8.92498 5.0656 9.94373H2.97185V12.2062H5.1031C5.3156 13.225 5.7656 14.1844 6.39685 15.0031L5.0656 16.3344L6.75935 18.0281L8.0906 16.6969C8.90935 17.3281 9.86873 17.7781 10.8875 17.9906V20.1531H13.15V18.0219C14.1687 17.8094 15.1281 17.3594 15.9469 16.7281L17.2906 18.0719L18.9844 16.3781L17.6406 15.0344C18.2719 14.2156 18.7219 13.2562 18.9344 12.2375H21.0656V12.2062L21.0281 12.15ZM11.9625 15.4406C9.83123 15.4406 8.10935 13.6906 8.10935 11.5281C8.10935 9.39686 9.85935 7.675 11.9969 7.675C14.1281 7.675 15.85 9.425 15.85 11.5875C15.85 13.7187 14.1 15.4406 11.9625 15.4406Z"
                  fill=""
                />
              </svg>
              Settings
            </Link>
          </li>
        </ul>
        <button
          onClick={() => console.log('Sign Out')}
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium text-meta-1 duration-300 ease-in-out hover:text-red-600 lg:text-base"
        >
          <svg
            className="fill-current"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3187 16.5C12.9719 16.8562 12.9625 17.4094 13.3187 17.7562C13.4812 17.9281 13.7031 18.0187 13.9344 18.0187C14.1656 18.0187 14.3875 17.9281 14.5594 17.7562L19.5594 12.7562C19.7375 12.5781 19.8344 12.3406 19.8344 12.0844C19.8344 11.8281 19.7375 11.5906 19.5594 11.4125L14.5594 6.41248C14.1844 6.03748 13.6062 6.03748 13.2312 6.41248C12.8562 6.78748 12.8562 7.36561 13.2312 7.74061L16.75 11.25H8.87502C8.35315 11.25 7.93752 11.6656 7.93752 12.1875C7.93752 12.7094 8.35315 13.125 8.87502 13.125H16.75L13.3187 16.5Z"
              fill=""
            />
            <path
              d="M5.5 21.4501C3.35938 21.4501 1.5375 20.3938 1.5375 17.8376V4.16255C1.5375 1.6063 3.35938 0.549805 5.5 0.549805H11C11.4844 0.549805 11.875 0.94043 11.875 1.4248C11.875 1.90918 11.4844 2.2998 11 2.2998H5.5C4.275 2.2998 3.3125 2.69043 3.3125 4.16255V17.8376C3.3125 19.3098 4.275 19.7004 5.5 19.7004H11C11.4844 19.7004 11.875 20.091 11.875 20.5754C11.875 21.0598 11.4844 21.4501 11 21.4501H5.5Z"
              fill=""
            />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
