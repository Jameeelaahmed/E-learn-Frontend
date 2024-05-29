import Group from '../Group/group'
import classes from './GroupsSlider.module.css'
export default function GroupsSlider() {
    return (
        <div className={classes.group_slider}>
            <Group subTitle="Computer Thoery" insName="Dr. Ahmed" />
            <Group subTitle="Computer Thoery" insName="Dr. Ahmed" />
            <Group subTitle="Computer Thoery" insName="Dr. Ahmed" />
        </div>
    )
}