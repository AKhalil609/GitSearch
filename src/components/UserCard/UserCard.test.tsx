import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import repositoriesReducer from '../../features/repositories/repositoriesSlice';
import { UserCard } from './';
import '@testing-library/jest-dom';

describe('UserCard', () => {
  const mockUser = {
    login: 'mockUser',
    id: 123,
    avatar_url: '',
  };

  const renderComponent = (user = mockUser) => {
    const store = configureStore({
      reducer: {
        repositories: repositoriesReducer,
      },
    });

    return render(
      <Provider store={store}>
        <UserCard user={user} />
      </Provider>
    );
  };

  it('should display the user login and not show repositories initially', () => {
    renderComponent();
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.queryByText('Repositories')).not.toBeInTheDocument();
  });

  it('should toggle the expanded state and dispatch action on click', async () => {
    renderComponent();
    const button = screen.getByRole('button');
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
