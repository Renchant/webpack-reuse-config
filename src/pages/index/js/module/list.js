import { h } from 'hyperapp';

export const List = ({ arr, event }) => arr.map(
    item => (
        <li class='list-item'>
            <div class='main-box'>
                <img class='item-icon' src={item.icon} />
                <div class='base-info'>
                    <h3>{item.name}</h3>
                    <p class='base-info-data'>
                        <span>解答:  {item.count}次</span>
                        <span>好评:  {item.praise}</span>
                    </p>
                </div>
                <button class='item-btn' onclick={() => event(item)}>免费诊断</button>
            </div>
            <p class='item-desc'>{item.desc}</p>
        </li>
    )
);



