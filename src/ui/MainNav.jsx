import StyledNavLink from '../StyledContainers/StyledNavLink';
import { HiOutlineHome } from 'react-icons/hi2';
import { useUser } from '../features/authentication/useUser';

function MainNav() {
  const { user } = useUser();
  return (
    <nav>
      <ul className="flex flex-col gap-[1.2rem]">
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            Home
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/notes">
            <HiOutlineHome />
            Notes
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/lectures">
            <HiOutlineHome />
            Lectures
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/sections">
            <HiOutlineHome />
            Sections
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/resources">
            <HiOutlineHome />
            Resources
          </StyledNavLink>
        </li>

        {user.role === 'super_admin' || user.role === 'admin' ? (
          <li>
            <StyledNavLink to="/admin">
              <HiOutlineHome />
              Admin Panel
            </StyledNavLink>
          </li>
        ) : (
          ''
        )}
      </ul>
    </nav>
  );
}

export default MainNav;
