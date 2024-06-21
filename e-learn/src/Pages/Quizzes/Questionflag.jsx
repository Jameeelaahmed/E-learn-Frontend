import classes from './Questionflag.module.css';

export default function Questionflag() {
    // Create an array from 1 to 10
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    console.log("flaaag")
    return (
        <div className={classes.Questionflag}>
            <ul>
                {numbers.map((number) => (
                    <li key={number}>
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
}
