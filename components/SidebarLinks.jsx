import ActiveLink from "./ActiveLink";

const SidebarSubLinks = ({ link }) => {
  return (
    <>
      <li key={link.id} className="mb-5">
        {!link.noLink ? (
          <ActiveLink href={link.id} changedNavbar={true} sidebar={true}>
            {link.title}
          </ActiveLink>
        ) : (
          <div className={`text-start text-cyan-700 cursor-default `}>
            {link.title}
          </div>
        )}
      </li>
      {link.subLinks ? (
        link.subLinks.map((subLink) => (
          <li key={subLink.id} className="list mb-5 pl-5">
            <ActiveLink
              href={`${link.id}/${subLink.id}`}
              changedNavbar={true}
              sidebar={true}
            >
              {`- ${subLink.title}`}
            </ActiveLink>
          </li>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default SidebarSubLinks;
