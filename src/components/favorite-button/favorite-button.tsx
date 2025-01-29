import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { getAuthStatus } from '../../store/modules/auth/selectors-auth';
import { useMemo } from 'react';
import { APIRoutes, LoginStatus } from '../../const';
import { uploadFavoriteStatus } from '../../store/modules/favorite/api-action-favorite';

type Props = {
  offerId: string;
  className: string;
  isFavorite: boolean;
  width: string;
  height: string;
};

export default function FavoriteButton({ width, height, isFavorite, className, offerId }: Props): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const isAuthorized = useMemo(() => authStatus === LoginStatus.Auth, [authStatus]);

  const active = isFavorite && isAuthorized ? `${className}__bookmark-button--active` : '';
  const classNameTxt = `${className}__bookmark-button ${active} button`;
  const button = (
    <button
      className={classNameTxt}
      type="button"
      onClick={() => {
        if (isAuthorized) {
          dispatch(uploadFavoriteStatus({
            offerId,
            status: isFavorite ? 0 : 1,
          }));
        } else {
          navigate(APIRoutes.Login);
        }
      }}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite && isAuthorized ? 'In bookmarks' : 'To bookmarks'}</span>
    </button >
  );
  return button;
}
