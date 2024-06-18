import Group from '../Group/group'
import classes from './GroupsSlider.module.css'
export default function GroupsSlider() {
    return (
        <div className={classes.group_slider}>
            <Group subTitle="Compiler Construction" insName="Dr. Abdo Mekky" />
            <Group subTitle="Big Data Analysis" insName="Dr. Nada" />
            <Group subTitle="Computer Vision" insName="Dr. Nada" />
        </div>
    )
}