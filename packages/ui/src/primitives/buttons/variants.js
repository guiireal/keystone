import { colors } from '../../theme';
import { alpha, darken, lighten } from '../../theme/color-utils';

const subtleAppearance = {
  default: {
    text: colors.N80,
    textHover: colors.text,
  },
  primary: {
    text: colors.N80,
    textHover: colors.primary,
  },
  warning: {
    text: colors.N80,
    textHover: colors.danger,
  },
  danger: {
    text: colors.danger,
    textHover: colors.danger,
    isSolidOnHover: true,
  },
};
const boldAppearance = {
  default: {
    bg: colors.N05,
    border: colors.N20,
    focusRing: colors.primary,
    text: colors.text,
  },
  primary: {
    bg: colors.primary,
    border: darken(colors.primary, 16),
    text: 'white',
  },
  create: {
    bg: colors.create,
    border: darken(colors.create, 16),
    text: 'white',
  },
  danger: {
    bg: colors.danger,
    border: darken(colors.danger, 8),
    text: 'white',
  },
  warning: {
    bg: colors.warning,
    border: darken(colors.warning, 12),
    text: 'white',
  },
};

export function makeSubtleVariant({ appearance, isDisabled }) {
  const { text, textHover, isSolidOnHover } = subtleAppearance[appearance];

  return {
    color: text,

    ':hover, :focus': isSolidOnHover
      ? makeBoldVariant({ appearance, isDisabled })
      : {
          color: textHover,
          textDecoration: 'underline',
        },
  };
}
export function makeBoldVariant({
  appearance,
  isDisabled,
  isActive,
  isHover,
  isFocus,
}) {
  const { bg, border, focusRing, text } = boldAppearance[appearance];
  const bgTop = lighten(bg, 10);
  const bgBottom = darken(bg, 10);
  const borderTop = lighten(border, 8);
  const borderBottom = darken(border, 16);
  const activeBg = darken(bg, 12);
  const textShadow =
    appearance === 'default'
      ? '0 1px 0 rgba(255, 255, 255, 0.5)'
      : '0 -1px 0 rgba(0, 0, 0, 0.25)';

  const hoverAndFocus =
    isHover || isFocus
      ? {
          borderColor: `${darken(borderTop, 8)} ${darken(border, 8)} ${darken(
            borderBottom,
            8
          )}`,
          background: `linear-gradient(to bottom, ${lighten(
            bgTop,
            10
          )} 0%, ${lighten(bgBottom, 8)} 100%)`,
        }
      : null;
  const hoverStyles = isHover
    ? {
        ...hoverAndFocus,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      }
    : null;
  const focusStyles =
    isFocus && !isDisabled
      ? {
          ...hoverAndFocus,
          borderColor: focusRing,
          boxShadow: `0 0 0 3px ${alpha(focusRing || bg, 0.2)}`,
        }
      : null;
  const activeStyles = isActive
    ? {
        background: activeBg,
        borderColor: `${darken(border, 24)} ${darken(border, 16)} ${darken(
          border,
          12
        )}`,
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.12)',
      }
    : null;

  return {
    backgroundColor: bgBottom,
    backgroundRepeat: 'repeat-x',
    background: isDisabled
      ? null
      : `linear-gradient(to bottom, ${bgTop} 0%, ${bgBottom} 100%)`,
    borderColor: isDisabled ? null : `${borderTop} ${border} ${borderBottom}`,
    color: text,
    fontWeight: 500,
    textDecoration: 'none',
    textShadow,

    ...hoverStyles,
    ...focusStyles,
    ...activeStyles,
  };
}