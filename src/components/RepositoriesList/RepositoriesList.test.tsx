import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from '../../features/repositories/repositoriesSlice';
import RepositoriesList from './';
import '@testing-library/jest-dom';
import { Status } from '../../features/types';

describe('RepositoriesList', () => {
  const renderComponent = (expandedState = true, initialState = {}) => {
    const store = configureStore({
      reducer: {
        repositories: repositoriesReducer,
      },
      preloadedState: initialState,
    });

    return render(
      <Provider store={store}>
        <RepositoriesList userLogin="testUser" expanded={expandedState} />
      </Provider>
    );
  };

  it('should display loading message when repositories are loading', () => {
    const initialState = {
      repositories: {
        testUser: {
          repositories: [],
          status: Status.Loading,
          error: null,
        },
      },
    };

    renderComponent(true, initialState);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display an error message when there is an error loading repositories', () => {
    const initialState = {
      repositories: {
        testUser: {
          repositories: [],
          status: Status.Failed,
          error: 'Error loading repositories',
        },
      },
    };

    renderComponent(true, initialState);
    expect(screen.getByText('Error loading repositories.')).toBeInTheDocument();
  });

  it('should display repositories when data is successfully loaded', () => {
    const initialState = {
      repositories: {
        testUser: {
          repositories: [
            { id: 1, name: 'Repo 1' },
            { id: 2, name: 'Repo 2' },
          ],
          status: Status.Success,
          error: null,
        },
      },
    };

    renderComponent(true, initialState);

    expect(screen.getByText('Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Repo 2')).toBeInTheDocument();
  });
});
