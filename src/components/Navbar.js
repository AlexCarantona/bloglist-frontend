import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import styled from 'styled-components'

const Button = styled.button`
  border: none;
  border-radius: 5px
  background-color: hsla(120, 20%, 30%, 0.5);
  margin-left: 1vh
`

const NavStyled = styled(NavLink)`
  background-color: hsla(10, 40%, 30%, 0.5);
  color: black;
  border: 0.1rem solid;
  text-decoration: none;
  padding: 0.2rem;
  margin: 0.1rem;
`

const Nav = styled.nav`
  display: flex;
  flex: 0.5 0.5 20vw;
  align-items: baseline;
  justify-content: space-between;
  background-color: hsla(280, 30%, 20%, 0.3);
  padding: 1rem

`

const Tabs = styled.div`
  justify-content: space-between;
  margin-right: auto;
`

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <Nav>
      <Tabs>
        <NavStyled to='/users'>Users</NavStyled>
        <NavStyled to='/'>Blogs</NavStyled>
      </Tabs>
      <span>{user.username} is logged in</span>
      <Button onClick={() => dispatch(logout())}>Log out</Button>
    </Nav>
  )
}

export default Navbar
