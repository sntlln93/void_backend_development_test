import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, switchMap } from 'rxjs';
import { DataDragonService } from '../data-dragon/data-dragon.service';
import { MatchResponse, Participant } from './responses/Match';
import { MatchApi } from './constants';

@Injectable()
export class RiotService {
    private readonly apiKey = process.env.RIOT_API_KEY;

    constructor(
        private readonly httpService: HttpService,
        private readonly dataDragonService: DataDragonService
    ) { }

    public getRecentMatchesIds(summoner: string, region: string): any {
        const puuid = this.getPlayerUuid(summoner);
        const URI = MatchApi.index.replace('{region}', region).replace('{puuid}', puuid);

        return this.httpService.get(
            URI,
            { params: { api_key: this.apiKey } }
        )
            .pipe(
                switchMap(response => this.getRecentMatchesDetails(response.data, region))
            );
    }

    public getRecentMatchesDetails(ids: string[], region: string): any {
        const id = ids[0];
        const URI = MatchApi.show.replace('{region}', region).replace('{id}', id);

        return this.httpService.get(
            URI,
            { params: { api_key: this.apiKey } }
        ).pipe(
            map((response: AxiosResponse<MatchResponse>) => response.data),
            map((match) => {
                return {
                    id: match.info.gameId,
                    queue: match.info.gameMode,
                    createdAt: match.info.gameCreation,
                    endedAt: match.info.gameEndTimestamp,
                    participants: match.info.participants.map((participant: Participant) => {
                        return {
                            id: participant.participantId,
                            puuid: participant.puuid,
                            teamId: participant.teamId,
                            icon: this.dataDragonService.getSummonerIconURI(participant.profileIcon),
                            stats: {
                                kills: participant.kills,
                                assists: participant.assists,
                                deaths: participant.deaths,
                                kda: ((participant.kills + participant.assists ) / participant.deaths).toFixed(2)
                            },
                            champion: {
                                id: participant.championId,
                                experience: participant.champExperience,
                                level: participant.champLevel,
                                name: participant.championName,
                                icon: this.dataDragonService.getChampionSquareIconURI(participant.championName),
                                build: this.dataDragonService.getItemIconsURI([
                                    participant.item0,
                                    participant.item1,
                                    participant.item2,
                                    participant.item3,
                                    participant.item4,
                                    participant.item5,
                                    participant.item6,
                                ]),
                                runes: []
                            }
                        }
                    })
                };
            })
        );
    }

    private getPlayerUuid(summoner: string): string {
        return 'SQPsANLVRYTvxSJGbTjpHZ0bNGzDQkJtQQBYPq9UpiMh9UgqhmOUMJbjPAgerP70-2xyuEy2CBgJuw';
    }

}
