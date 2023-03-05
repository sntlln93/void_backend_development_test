import { Injectable } from '@nestjs/common';

@Injectable()
export class DataDragonService {
    private readonly path = 'https://ddragon.leagueoflegends.com/cdn';
    private readonly version = '13.4.1';

    public getSummonerIconURI(iconId: number): string {
        return `${this.path}/${this.version}/img/profileicon/${iconId}.png`;
    }

    public getChampionSquareIconURI(championName: string): string {
        const qualifiedName = championName.charAt(0).toUpperCase() + championName.slice(1);

        return `${this.path}/${this.version}/img/champion/${qualifiedName}.png`;
    }

    public getItemIconsURI(itemIds: number[]): string[] {
        return itemIds.filter(itemId => itemId !== 0).map(itemId => `${this.path}/${this.version}/img/item/${itemId}.png`)
    }
}