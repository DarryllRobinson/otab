import React, { useEffect } from 'react';
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { boardService } from './board.service';
import { userService } from '../Users/user.service';

export async function boardsLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const user = (await userService.userValue)
    ? await userService.userValue
    : { id: 1 };
  console.log('Board user: ', user);
  const boards = await boardService.getAllByUserId({ userId: user.id });
  console.log('Boards boards:', boards);
  return { boards, q };
}

export default function Boards() {
  const { boards, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);

  return (
    <Box
      sx={{
        // marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box>Active Boards</Box>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search boards"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget.form, { replace: !isFirstSearch });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <nav>
            {boards.length ? (
              <ul>
                {boards.map((board) => (
                  <li key={board.id}>
                    <NavLink
                      to={`board/${board.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? 'active' : isPending ? 'pending' : ''
                      }
                    >
                      {board.competitionId ? (
                        <>{board.competitionId}</>
                      ) : (
                        <i>No Board Name</i>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No boards</i>
              </p>
            )}
          </nav>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box className={navigation.state === 'loading' ? 'loading' : ''}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
