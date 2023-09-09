type IconProps = {
  fill?: string;
  className?: string;
}

export function IconClose(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={props.fill ? props.fill : "currentColor"} className={props.className ? props.className : "w-5 h-5"}>
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={props.fill ? props.fill : "currentColor"} className={props.className ? props.className : "w-5 h-5"}>
      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
  )
}

export function IconShare(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={props.className ? props.className : "w-5 h-5"}>
      <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
    </svg>
  )
}

export function IconPin(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={props.className ? props.className : "w-5 h-5"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>

  )
}

export function IconDog(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <g>
        <path fill="currentColor" d="M439.464,51.073c-6.026-13.266-13.941-25.629-24.903-35.19c-10.87-9.57-25.367-15.967-41.621-15.882
		c-8.295-0.008-16.126,1.739-23.054,4.751c-12.177,5.3-21.367,14.101-28.414,23.535c-10.548,14.212-16.793,30.254-20.759,42.912
		c-1.055,3.409-1.933,6.548-2.667,9.375h-29.055h-25.984h-29.063c-2.127-8.312-5.612-19.578-11.063-31.308
		c-5.291-11.232-12.354-22.954-22.658-32.532c-5.148-4.768-11.164-8.978-18.11-11.983c-6.929-3.012-14.768-4.76-23.055-4.751
		c-16.16-0.085-30.615,6.135-41.519,15.544C81.093,29.739,71.313,49.95,64.908,70.853c-6.321,20.987-9.013,42.945-9.03,61.696
		c0,28.591,0,140.346,0,181.932c0.008,15.916,2.482,35.696,8.616,56.894c9.215,31.713,26.785,66.751,57.671,94.21
		c30.81,27.494,75.021,46.515,133.831,46.414c39.215,0.016,71.933-8.312,98.523-22.144c39.966-20.742,65.544-53.434,80.802-86.068
		c15.3-32.768,20.759-65.485,20.801-89.307c0-41.586,0-153.341,0-181.932C456.046,108.355,451.397,77.688,439.464,51.073z
		 M424.933,314.481c0.008,12.666-2.068,29.924-7.384,48.202c-7.966,27.493-23.106,57.148-48.414,79.569
		c-25.375,22.397-60.844,38.456-113.139,38.557c-34.86-0.016-62.236-7.274-84.135-18.625c-32.768-17.029-53.789-43.67-66.945-71.636
		c-8.506-18.059-13.468-36.625-15.907-52.675c12.565,0,34.473,0,64.574,0c49.443,0,82.405-47.586,82.405-86.042
		c0-29.578,0-106.228,0-140.076h7.021h25.984h54.869l2.109-13.097c0.025-0.414,3.392-19.536,11.797-37.012
		c4.144-8.735,9.528-16.92,15.469-22.27c2.979-2.7,6.033-4.725,9.198-6.076c3.198-1.35,6.523-2.102,10.506-2.11
		c8.439,0.084,14.734,2.768,21.173,8.245c9.553,8.118,17.908,23.586,23.114,41.198c5.308,17.518,7.73,36.928,7.706,51.915
		C424.933,161.14,424.933,272.895,424.933,314.481z"/>
        <path fill="currentColor" d="M253.397,350.86c-22.963,0-41.579,13.975-41.579,31.19c0,17.224,18.616,31.19,41.579,31.19
		c22.97,0,41.586-13.966,41.586-31.19C294.984,364.835,276.368,350.86,253.397,350.86z"/>
        <circle fill="currentColor" cx="333.971" cy="249.502" r="25.992" />
        <path fill="currentColor" d="M372.08,71.039c-17.316,0-20.793,36.388-20.793,36.388h38.126C389.413,107.426,389.396,71.039,372.08,71.039z"
        />
      </g>
    </svg>
  )
}

export function IconHome(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 20V14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14V20M10.9833 3.60011L4.98335 7.14177C4.37395 7.50149 4 8.15646 4 8.8641V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8.8641C20 8.15646 19.6261 7.50149 19.0167 7.14177L13.0167 3.60011C12.3894 3.22988 11.6106 3.22988 10.9833 3.60011Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconDonation(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points="15.82 14.86 8.18 14.86 1.5 14.86 1.5 1.5 22.5 1.5 22.5 14.86 19.64 14.86" />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M9.14,11.05h3.34a1.44,1.44,0,0,0,1.43-1.44h0a1.43,1.43,0,0,0-1.43-1.43h-1a1.43,1.43,0,0,1-1.43-1.43h0a1.43,1.43,0,0,1,1.43-1.43h3.34" />
      <line fill="none" stroke="currentColor" strokeWidth="1.5" x1="12" y1="3.41" x2="12" y2="5.32" />
      <line fill="none" stroke="currentColor" strokeWidth="1.5" x1="12" y1="11.05" x2="12" y2="12.95" />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M17.73,22.5h0a6.52,6.52,0,0,0,1.91-4.61v-4A1.91,1.91,0,0,0,17.73,12h0a1.9,1.9,0,0,0-1.91,1.91v2.86l-.2.1a3.1,3.1,0,0,0-1.71,2.77h0" />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M8.18,14.86v3a6.52,6.52,0,0,0,1.91,4.61" />
    </svg>
  )
}

export function IconFundraiser(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 20.087H8.61029C8.95063 20.087 9.28888 20.1275 9.61881 20.2085L12.3769 20.8788C12.9753 21.0246 13.5988 21.0387 14.2035 20.9213L17.253 20.328C18.0585 20.1711 18.7996 19.7853 19.3803 19.2204L21.5379 17.1216C22.154 16.5233 22.154 15.5523 21.5379 14.953C20.9832 14.4133 20.1047 14.3526 19.4771 14.8102L16.9626 16.6447C16.6025 16.908 16.1643 17.0497 15.7137 17.0497H13.2855L14.8311 17.0497C15.7022 17.0497 16.4079 16.3632 16.4079 15.5158V15.209C16.4079 14.5054 15.9156 13.8919 15.2141 13.7218L12.8286 13.1416C12.4404 13.0475 12.0428 12.9999 11.6431 12.9999C10.6783 12.9999 8.93189 13.7987 8.93189 13.7987L6 15.0248M2 14.5999L2 20.3999C2 20.9599 2 21.24 2.10899 21.4539C2.20487 21.642 2.35785 21.795 2.54601 21.8909C2.75992 21.9999 3.03995 21.9999 3.6 21.9999H4.4C4.96005 21.9999 5.24008 21.9999 5.45399 21.8909C5.64215 21.795 5.79513 21.642 5.89101 21.4539C6 21.24 6 20.9599 6 20.3999V14.5999C6 14.0398 6 13.7598 5.89101 13.5459C5.79513 13.3577 5.64215 13.2048 5.45399 13.1089C5.24008 12.9999 4.96005 12.9999 4.4 12.9999H3.6C3.03995 12.9999 2.75992 12.9999 2.54601 13.1089C2.35785 13.2048 2.20487 13.3577 2.10899 13.5459C2 13.7598 2 14.0398 2 14.5999ZM17.1914 3.59215C16.5946 2.34329 15.2186 1.68168 13.8804 2.32027C12.5423 2.95886 11.9722 4.47328 12.5325 5.80272C12.8787 6.62435 13.8707 8.2199 14.5781 9.31893C14.8394 9.725 14.9701 9.92804 15.161 10.0468C15.3247 10.1487 15.5297 10.2036 15.7224 10.1972C15.9471 10.1898 16.1618 10.0793 16.5911 9.85832C17.7532 9.26021 19.4101 8.37445 20.1208 7.83602C21.2707 6.96481 21.5556 5.36347 20.6947 4.14614C19.8337 2.9288 18.3327 2.80902 17.1914 3.59215Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconProfile(props: IconProps) {
  return (
    // <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
    //   <g id="Page-1" stroke="none" strokeWidth="1" fill="currentColor" fill-rule="evenodd">
    //     <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="currentColor">
    //       <g id="icons" transform="translate(56.000000, 160.000000)">
    //         <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1342]">
    //         </path>
    //       </g>
    //     </g>
    //   </g>
    // </svg>
    <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8.5C14 9.88071 12.8807 11 11.5 11C10.1193 11 9 9.88071 9 8.5C9 7.11929 10.1193 6 11.5 6C12.8807 6 14 7.11929 14 8.5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M18.5 20C17 20.5 6.00001 21 5.00001 20C4.00001 19 8.41015 14.5 12 14.5C15.5899 14.5 20 19.5 18.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconDog2(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} fill="currentColor" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
      <path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60,12a12,12,0,1,0-12-12A12,12,0,0,0,164,152Zm68.72656-8.041a16.26177,16.26177,0,0,1-6.72363,1.47657A15.60358,15.60358,0,0,1,216,141.7915V184a40.04552,40.04552,0,0,1-40,40H80a40.04552,40.04552,0,0,1-40-40V141.7915a15.60358,15.60358,0,0,1-10.00293,3.644,16.254,16.254,0,0,1-6.72363-1.47657,15.76942,15.76942,0,0,1-9.12012-17.521l16.418-87.56592A16.00071,16.00071,0,0,1,50.17871,26.29834L104.98535,40h46.0293l54.80664-13.70166a15.99961,15.99961,0,0,1,19.60644,12.57227L241.84668,126.438A15.76942,15.76942,0,0,1,232.72656,143.959ZM200,122.04,148.11133,56H107.88867L56,122.04V184a24.0275,24.0275,0,0,0,24,24h40V195.314l-13.65723-13.65722a8.00018,8.00018,0,0,1,11.31446-11.31348L128,180.68652l10.34277-10.34326a8.00018,8.00018,0,0,1,11.31446,11.31348L136,195.314V208h40a24.0275,24.0275,0,0,0,24-24Z" />
    </svg>
  )
}

export function IconHeart(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>

  )
}

export function IconHeartSolid(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>

  )
}

export function IconCheck(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
    </svg>
  )
}

export function IconFacebook(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12.05C19.9813 10.5255 19.5273 9.03809 18.6915 7.76295C17.8557 6.48781 16.673 5.47804 15.2826 4.85257C13.8921 4.2271 12.3519 4.01198 10.8433 4.23253C9.33473 4.45309 7.92057 5.10013 6.7674 6.09748C5.61422 7.09482 4.77005 8.40092 4.3343 9.86195C3.89856 11.323 3.88938 12.8781 4.30786 14.3442C4.72634 15.8103 5.55504 17.1262 6.69637 18.1371C7.83769 19.148 9.24412 19.8117 10.75 20.05V14.38H8.75001V12.05H10.75V10.28C10.7037 9.86846 10.7483 9.45175 10.8807 9.05931C11.0131 8.66687 11.23 8.30827 11.5161 8.00882C11.8022 7.70936 12.1505 7.47635 12.5365 7.32624C12.9225 7.17612 13.3368 7.11255 13.75 7.14003C14.3498 7.14824 14.9482 7.20173 15.54 7.30003V9.30003H14.54C14.3676 9.27828 14.1924 9.29556 14.0276 9.35059C13.8627 9.40562 13.7123 9.49699 13.5875 9.61795C13.4627 9.73891 13.3667 9.88637 13.3066 10.0494C13.2464 10.2125 13.2237 10.387 13.24 10.56V12.07H15.46L15.1 14.4H13.25V20C15.1399 19.7011 16.8601 18.7347 18.0985 17.2761C19.3369 15.8175 20.0115 13.9634 20 12.05Z"
        fill="#4267B2" />
    </svg>
  )
}

export function IconTwitter(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      viewBox="-143 145 512 512">
      <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M215.2,361.2
	c0.1,2.2,0.1,4.5,0.1,6.8c0,69.5-52.9,149.7-149.7,149.7c-29.7,0-57.4-8.7-80.6-23.6c4.1,0.5,8.3,0.7,12.6,0.7
	c24.6,0,47.3-8.4,65.3-22.5c-23-0.4-42.5-15.6-49.1-36.5c3.2,0.6,6.5,0.9,9.9,0.9c4.8,0,9.5-0.6,13.9-1.9
	C13.5,430-4.6,408.7-4.6,383.2v-0.6c7.1,3.9,15.2,6.3,23.8,6.6c-14.1-9.4-23.4-25.6-23.4-43.8c0-9.6,2.6-18.7,7.1-26.5
	c26,31.9,64.7,52.8,108.4,55c-0.9-3.8-1.4-7.8-1.4-12c0-29,23.6-52.6,52.6-52.6c15.1,0,28.8,6.4,38.4,16.6
	c12-2.4,23.2-6.7,33.4-12.8c-3.9,12.3-12.3,22.6-23.1,29.1c10.6-1.3,20.8-4.1,30.2-8.3C234.4,344.5,225.5,353.7,215.2,361.2z"
        fill="#1DA1F2" />
    </svg>
  )
}

export function IconReddit(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.24 13.6C10.0818 13.6 9.92711 13.5531 9.79555 13.4652C9.66399 13.3773 9.56145 13.2523 9.5009 13.1061C9.44035 12.96 9.42451 12.7991 9.45538 12.6439C9.48624 12.4887 9.56244 12.3462 9.67432 12.2343C9.7862 12.1224 9.92875 12.0462 10.0839 12.0154C10.2391 11.9845 10.4 12.0003 10.5461 12.0609C10.6923 12.1214 10.8173 12.224 10.9052 12.3555C10.9931 12.4871 11.04 12.6418 11.04 12.8C11.04 12.9051 11.0193 13.0091 10.9791 13.1061C10.9389 13.2032 10.88 13.2914 10.8057 13.3657C10.7314 13.44 10.6432 13.4989 10.5461 13.5391C10.4491 13.5793 10.3451 13.6 10.24 13.6ZM20 12C20 13.5823 19.5308 15.129 18.6518 16.4446C17.7727 17.7602 16.5233 18.7855 15.0615 19.391C13.5997 19.9965 11.9911 20.155 10.4393 19.8463C8.88743 19.5376 7.46197 18.7757 6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00347 10.4003 4.60897 8.93853C5.21447 7.47672 6.23985 6.22729 7.55544 5.34824C8.87103 4.46919 10.4178 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12ZM15.73 10.67C15.4543 10.6862 15.1943 10.8038 15 11C14.1775 10.4564 13.2158 10.1613 12.23 10.15L12.79 7.62L14.58 8.02C14.5787 8.12458 14.5981 8.22839 14.6372 8.32539C14.6764 8.4224 14.7343 8.51067 14.8078 8.58509C14.8813 8.65951 14.9689 8.7186 15.0654 8.75892C15.1619 8.79925 15.2654 8.82001 15.37 8.82C15.5831 8.81737 15.7866 8.73087 15.9363 8.57925C16.0861 8.42763 16.17 8.2231 16.17 8.01C16.176 7.82715 16.1183 7.6479 16.0069 7.50284C15.8954 7.35777 15.737 7.25589 15.5588 7.21458C15.3806 7.17327 15.1936 7.1951 15.0296 7.27633C14.8657 7.35756 14.7351 7.49317 14.66 7.66L12.66 7.22C12.6124 7.21087 12.5631 7.22027 12.5222 7.2463C12.4813 7.27233 12.4519 7.313 12.44 7.36L11.82 10.15C10.8346 10.1641 9.87368 10.4589 9.05 11C8.94175 10.8882 8.81043 10.8014 8.66518 10.7456C8.51993 10.6898 8.36426 10.6663 8.20902 10.6769C8.05378 10.6874 7.9027 10.7316 7.76631 10.8065C7.62993 10.8814 7.51152 10.9852 7.41934 11.1105C7.32717 11.2359 7.26344 11.3799 7.23261 11.5324C7.20178 11.6849 7.20458 11.8423 7.24082 11.9936C7.27706 12.1449 7.34586 12.2865 7.44244 12.4085C7.53902 12.5305 7.66104 12.63 7.8 12.7C7.78471 12.8663 7.78471 13.0337 7.8 13.2C7.8 14.89 9.71 16.27 12.06 16.27C14.41 16.27 16.32 14.89 16.32 13.2C16.3204 13.0282 16.3002 12.857 16.26 12.69C16.4621 12.5755 16.6215 12.3984 16.714 12.1854C16.8066 11.9724 16.8274 11.7351 16.7732 11.5092C16.719 11.2834 16.5927 11.0813 16.4136 10.9335C16.2344 10.7858 16.012 10.7003 15.78 10.69L15.73 10.67ZM13.51 14.42C13.0606 14.7023 12.5407 14.852 12.01 14.852C11.4793 14.852 10.9594 14.7023 10.51 14.42C10.4731 14.3863 10.425 14.3676 10.375 14.3676C10.325 14.3676 10.2769 14.3863 10.24 14.42C10.2206 14.4378 10.2051 14.4594 10.1945 14.4835C10.1839 14.5076 10.1785 14.5337 10.1785 14.56C10.1785 14.5863 10.1839 14.6124 10.1945 14.6365C10.2051 14.6606 10.2206 14.6822 10.24 14.7C10.7652 15.0564 11.3853 15.2469 12.02 15.2469C12.6547 15.2469 13.2748 15.0564 13.8 14.7C13.8194 14.6822 13.8349 14.6606 13.8455 14.6365C13.8561 14.6124 13.8616 14.5863 13.8616 14.56C13.8616 14.5337 13.8561 14.5076 13.8455 14.4835C13.8349 14.4594 13.8194 14.4378 13.8 14.42C13.7813 14.4003 13.7588 14.3847 13.7339 14.374C13.709 14.3633 13.6821 14.3577 13.655 14.3577C13.6279 14.3577 13.601 14.3633 13.5761 14.374C13.5512 14.3847 13.5287 14.4003 13.51 14.42ZM13.76 12C13.6018 12 13.4471 12.0469 13.3155 12.1348C13.184 12.2227 13.0814 12.3477 13.0209 12.4939C12.9604 12.64 12.9445 12.8009 12.9754 12.9561C13.0062 13.1113 13.0824 13.2538 13.1943 13.3657C13.3062 13.4776 13.4487 13.5538 13.6039 13.5846C13.7591 13.6155 13.92 13.5997 14.0662 13.5391C14.2123 13.4786 14.3373 13.376 14.4252 13.2445C14.5131 13.1129 14.56 12.9582 14.56 12.8C14.56 12.5878 14.4757 12.3843 14.3257 12.2343C14.1757 12.0843 13.9722 12 13.76 12Z"
        fill="#ff4500" />
    </svg>
  )
}

export function IconEmail(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.005 9C7.005 8.45 7.45 8 8 8H16C16.55 8 17 8.45 17 9V15C17 15.55 16.55 16 16 16H8C7.45 16 7 15.55 7 15L7.005 9ZM12 12.5L8.00001 9.99997V15H16V9.99997L12 12.5ZM12 11.5L8.00001 9.00001H16L12 11.5Z"
        fill="currentColor" />
    </svg>
  )
}

export function IconHorizontalDots(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 12H18.01M12 12H12.01M6 12H6.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM19 12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11C18.5523 11 19 11.4477 19 12ZM7 12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>

  )
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>

  )
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg className={props.className ? props.className : "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  )
}

export function IconComment(props: IconProps) {
  return (
    // <svg className={props.className ? props.className : "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    //   <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={props.className ? props.className : "w-5 h-5"}>
      <path fillRule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z" clipRule="evenodd" />
    </svg>

  )
}

