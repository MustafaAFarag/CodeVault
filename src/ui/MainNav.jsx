import StyledNavLink from '../StyledContainers/StyledNavLink';
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlinePlay,
  HiOutlineCollection,
  HiOutlineCog,
  HiOutlineClipboard,
} from 'react-icons/hi';
import { useUser } from '../features/authentication/useUser';

function MainNav() {
  const { user } = useUser();

  return (
    <nav>
      <ul className="flex flex-col gap-10 text-xl font-semibold pl-5">
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome className="text-teal-600" />
            Home
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/notes">
            <HiOutlineDocumentText className="text-teal-600" />
            Notes
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/lectures">
            <HiOutlinePlay className="text-teal-600" />
            Lectures
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/sections">
            <HiOutlineCollection className="text-teal-600" />
            Sections
          </StyledNavLink>
        </li>

        {user.role === 'super_admin' || user.role === 'admin' ? (
          <li>
            <StyledNavLink to="/admin">
              <HiOutlineCog className="text-teal-600" />
              Admin Panel
            </StyledNavLink>
          </li>
        ) : null}

        {user.role === 'super_admin' ? (
          <li>
            <StyledNavLink to="/logs">
              <HiOutlineClipboard className="text-teal-600" />
              Logs
            </StyledNavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default MainNav;
