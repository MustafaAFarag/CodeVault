import StyledNavLink from '../StyledContainers/StyledNavLink';
import { HiOutlineHome } from 'react-icons/hi2';

function MainNav() {
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

        <li>
          <StyledNavLink to="/quiztime">
            <HiOutlineHome />
            QuizTime!
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/showcase">
            <HiOutlineHome />
            Showcase
          </StyledNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
