import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SearchInput from './index';
import * as reduxHooks from '../../app/hooks';
import * as userSearchActions from '../../features/userSearch/userSearchSlice';

jest.mock('react-inlinesvg', () => () => <svg></svg>);

jest.mock('../../app/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('SearchInput Component', () => {
  const placeholderText = 'Search users...';
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    (reduxHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <SearchInput placeholder={placeholderText} />
      </Provider>
    );
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it('updates on input change', async () => {
    render(
      <Provider store={store}>
        <SearchInput placeholder={placeholderText} />
      </Provider>
    );
    await userEvent.type(screen.getByPlaceholderText(placeholderText), 'john');
    expect(
      (screen.getByPlaceholderText(placeholderText) as HTMLInputElement).value
    ).toBe('john');
  });

  it('clears input and search results on clear icon click', async () => {
    render(
      <Provider store={store}>
        <SearchInput placeholder={placeholderText} />
      </Provider>
    );
    const input = screen.getByPlaceholderText(
      placeholderText
    ) as HTMLInputElement;
    await userEvent.type(input, 'john');
    expect(input.value).toBe('john');

    const clearButtons = screen.getAllByLabelText('clear');

    await userEvent.click(clearButtons[0]);
    expect(input.value).toBe('');
    expect(mockDispatch).toHaveBeenCalledWith(
      userSearchActions.clearSearchResults()
    );
  });

  it('triggers search on enter key press', async () => {
    render(
      <Provider store={store}>
        <SearchInput placeholder={placeholderText} />
      </Provider>
    );
    const input = screen.getByPlaceholderText(placeholderText);

    await userEvent.type(input, 'john{enter}');

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('triggers search on search icon click', async () => {
    render(
      <Provider store={store}>
        <SearchInput placeholder={placeholderText} />
      </Provider>
    );
    await userEvent.type(screen.getByPlaceholderText(placeholderText), 'john');

    const searchIcon = screen.getAllByLabelText('search');

    await userEvent.click(searchIcon[0]);

    await expect(mockDispatch).toHaveBeenCalled();
  });

  it('sets the placeholder text correctly', () => {
    render(
      <Provider store={store}>
        <SearchInput placeholder="Type a username..." />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText('Type a username...')
    ).toBeInTheDocument();
  });
});
