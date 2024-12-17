import classes from './ProfileIcon.module.css';

export default function ProfileIcon({ isActive, photoSrc }) {
  if (isActive) {
    return (
      <div>
      <img src={photoSrc} />
    </div>
    )
  }

  return (
    <div className={classes.avatarWrapper}>
      <img src={photoSrc} />
    </div>
  )
}