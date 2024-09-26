/* eslint-disable react/prop-types */
import StyledNavLink from '../StyledContainers/StyledNavLink';
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiDocumentReport,
  HiOutlineCollection,
  HiOutlineCog,
  HiOutlineClipboard,
  HiClipboardList,
  HiAcademicCap,
} from 'react-icons/hi';
import { useUser } from '../features/authentication/useUser';

function MainNav({ toggleSidebar }) {
  const { user } = useUser();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <nav className="h-full">
      <ul className="flex flex-col gap-6 pl-2 text-lg font-semibold md:gap-10 md:pl-5 md:text-xl">
        <li>
          <StyledNavLink to="/dashboard" onClick={handleLinkClick}>
            <HiOutlineHome className="text-teal-600" />
            Home
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/notes" onClick={handleLinkClick}>
            <HiOutlineDocumentText className="text-teal-600" />
            Notes
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/lectures" onClick={handleLinkClick}>
            <HiDocumentReport className="text-teal-600" />
            Lectures
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/sections" onClick={handleLinkClick}>
            <HiOutlineCollection className="text-teal-600" />
            Sections
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            to="/sections"
            onClick={handleLinkClick}
            disabled={true}
          >
            <HiClipboardList className="text-teal-600" />
            Midterm
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            to="/sections"
            onClick={handleLinkClick}
            disabled={true}
          >
            <HiAcademicCap className="text-teal-600" />
            Finals
          </StyledNavLink>
        </li>
        {user.role === 'super_admin' || user.role === 'admin' ? (
          <>
            <li>
              <StyledNavLink to="/admin" onClick={handleLinkClick}>
                <HiOutlineCog className="text-teal-600" />
                Admin Panel
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/logs" onClick={handleLinkClick}>
                <HiOutlineClipboard className="text-teal-600" />
                Logs
              </StyledNavLink>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default MainNav;
