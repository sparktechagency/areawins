/**
 * Match, Tournament, and Team API endpoints
 */

import type {
  Match,
  MatchFilter,
  MatchStatistics,
  MatchesResponse,
  SportType,
  Team,
  Tournament,
  TournamentStandings,
} from "@/types";
import { baseApi } from "./baseApi";

export const matchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get live matches
    getLiveMatches: builder.query<MatchesResponse, MatchFilter | undefined>({
      query: (filter) => ({
        url: "/matches/live",
        params: filter,
      }),
      providesTags: ["LiveMatches"],
    }),

    // Get upcoming matches
    getUpcomingMatches: builder.query<MatchesResponse, MatchFilter | undefined>(
      {
        query: (filter) => ({
          url: "/matches/upcoming",
          params: filter,
        }),
        providesTags: ["Matches"],
      }
    ),

    // Get match by ID
    getMatchById: builder.query<{ match: Match }, string>({
      query: (matchId) => `/matches/${matchId}`,
      providesTags: (result, error, matchId) => [
        { type: "Matches", id: matchId },
      ],
    }),

    // Get matches by sport
    getMatchesBySport: builder.query<
      MatchesResponse,
      { sport: SportType; filter?: MatchFilter }
    >({
      query: ({ sport, filter }) => ({
        url: `/matches/sport/${sport}`,
        params: filter,
      }),
      providesTags: (result, error, { sport }) => [
        { type: "Matches", id: sport },
      ],
    }),

    // Get tournaments
    getTournaments: builder.query<
      { tournaments: Tournament[] },
      { sport?: SportType }
    >({
      query: (params) => ({
        url: "/tournaments",
        params,
      }),
      providesTags: ["Tournaments"],
    }),

    // Get tournament by ID
    getTournamentById: builder.query<{ tournament: Tournament }, string>({
      query: (tournamentId) => `/tournaments/${tournamentId}`,
      providesTags: (result, error, tournamentId) => [
        { type: "Tournaments", id: tournamentId },
      ],
    }),

    // Get tournament standings
    getTournamentStandings: builder.query<TournamentStandings, string>({
      query: (tournamentId) => `/tournaments/${tournamentId}/standings`,
      providesTags: (result, error, tournamentId) => [
        { type: "Tournaments", id: `${tournamentId}-standings` },
      ],
    }),

    // Get teams
    getTeams: builder.query<
      { teams: Team[] },
      { sport?: SportType; search?: string }
    >({
      query: (params) => ({
        url: "/teams",
        params,
      }),
      providesTags: ["Teams"],
    }),

    // Get team by ID
    getTeamById: builder.query<{ team: Team }, string>({
      query: (teamId) => `/teams/${teamId}`,
      providesTags: (result, error, teamId) => [{ type: "Teams", id: teamId }],
    }),

    // Get match statistics
    getMatchStatistics: builder.query<MatchStatistics, string>({
      query: (matchId) => `/matches/${matchId}/statistics`,
      providesTags: (result, error, matchId) => [
        { type: "Matches", id: `${matchId}-stats` },
      ],
    }),

    // Get featured matches
    getFeaturedMatches: builder.query<{ matches: Match[] }, void>({
      query: () => "/matches/featured",
      providesTags: ["Matches"],
    }),

    // Get matches by tournament
    getMatchesByTournament: builder.query<
      MatchesResponse,
      { tournamentId: string; filter?: MatchFilter }
    >({
      query: ({ tournamentId, filter }) => ({
        url: `/matches/tournament/${tournamentId}`,
        params: filter,
      }),
      providesTags: (result, error, { tournamentId }) => [
        { type: "Matches", id: `tournament-${tournamentId}` },
      ],
    }),

    // Get team matches
    getTeamMatches: builder.query<
      MatchesResponse,
      { teamId: string; filter?: MatchFilter }
    >({
      query: ({ teamId, filter }) => ({
        url: `/matches/team/${teamId}`,
        params: filter,
      }),
      providesTags: (result, error, { teamId }) => [
        { type: "Matches", id: `team-${teamId}` },
      ],
    }),

    // Search matches
    searchMatches: builder.query<
      MatchesResponse,
      { query: string; filter?: MatchFilter }
    >({
      query: ({ query, filter }) => ({
        url: "/matches/search",
        params: { q: query, ...filter },
      }),
    }),
  }),
});

export const {
  useGetLiveMatchesQuery,
  useGetUpcomingMatchesQuery,
  useGetMatchByIdQuery,
  useGetMatchesBySportQuery,
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useGetTournamentStandingsQuery,
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useGetMatchStatisticsQuery,
  useGetFeaturedMatchesQuery,
  useGetMatchesByTournamentQuery,
  useGetTeamMatchesQuery,
  useSearchMatchesQuery,
} = matchApi;
