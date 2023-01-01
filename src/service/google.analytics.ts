import { google } from 'googleapis';
import { PostsQueryParams } from '../models/posts.model';
import { GAGetPostsResponse, GAGetPostsDetail } from '../../ts-api';
import { getPrivKeyFormatted } from '../utils/private.key';

export class gaService {
    static getPosts = async (params: PostsQueryParams) => {
        const gaJWTAuth = new google.auth.JWT(
            "alexxi@peppy-generator-372818.iam.gserviceaccount.com", //process.env.GA_CLIENT_EMAIL,
            undefined,
            getPrivKeyFormatted("-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJgTYuZ9JA2Tjo\n2b+ZJwn45FiEjwHuHsUm9jTajmRhcxkjYdl7MWq7IdRciy8jgZetPAQNKIji22F7\nsh8dNp3OQWAniDZxWHqehc3wcE5lAynNMP8PrrNjEL4ly83FRwGqvUwdIKIGhlHQ\nix3gZcQqY6XZ8djMu+i4jN2728W2g5aKQed80pik5PmFrUM+RckKRwuGQd79ci2Q\nkHghff2zM7Ziday1WeFIVpJ6RsjZE2AqSAu6bpXdUiN5+H0CHeP3WIm9r7oohWmP\nPColAfUM/WXud87kD3gWX29omDZJB1qH0NuwcGW6WHgNd2/hSY9B2X5X2PPrlIQ4\n96K4EkjJAgMBAAECggEACqXhbjMWBw97fIF6KI6Jrj1pyIpyionVdvU6boSo/QXL\nIaWja4k9V7lmSoQf1+9ai6DQ4X2feyZm2LWdQ4rN7LbjbP9biiKH6z3Ml7ylhdy0\njiddSQ+9IrphI+fovhieF87EOYNOkIvzQZMCX4fdJXTJ0DIhl9MDrZHjCzDmOhpS\nvdHLWpx8LwgiiwAIqPFFJprSB5iNDMp+JjnBWKoudrRPBecqR9rA7Rn9kcP2oaRt\neXup6D15E1L+fr3IoG5hfmFQdBzhWNQIeGqySDiZ3ZzcgYUUyFO+4bzlf+TpS5l4\nX2VpwVOb8XriZFsXokeW1a+5BpHJWFsgrjKwJzpboQKBgQDmpc9gEQ5eDDzCDmiQ\nttt1+tITIlcWdbDLiXMTdxNic9KHss/9l3imTsp0fLGZdXeyxhCCSy9fvxp5t7Gx\nIw/U+nOmBrNFrJ6GMlc3Ughw2uiQmh3JeUHiOAU3Z3XMs8DzGa++soYL4GsyXzn+\n9AK4ttTlm0XTPqzqMU6NNMuKIQKBgQDfp1k1DS1Z9zBIT19ogeUVPk6ROGYl1yKH\nl3HX6l2pICVkAUVCFK7qSBFK+w7I3tJqut7imbbsNhuDJ4T3C05D3Ap2l+L7lDQK\nUGYCo+UsGiajwVx3SCZzmQx7WBUHILyBVMWFuJ1Z0SSVlNlcdcQNjFELLsdzt0PV\nspYbPRr5qQKBgQC9W9Hmb/pYsjlLpKKqdMW2lcbU2LOhB9yvLdhhWbh7ctWcfOyP\nqUTvXO6QNjNk5vDvv/ab0fhB5lZpKavj3wJHe5to6kVSZYb8a+X40AuIA+E9npnn\n5/p0LEP0Gae3+LfnneYQbObqZ0P65f1qWJDHb6tYGmN4LBOwbeyst3SHoQKBgQCU\noyB7TIWea9RvyihrSSCZTK5kfuoMLf0pxfGIAJ88fju7ScjgkORqmXi8rzt1LfkD\nq6vjRys1swP31zTcBmx+VuexR2I3tpgbXrFdAdWVyM9zN1efgpjjbIzKEJDxCsWc\n4lzfcQFKJt+8dY87jpy8MEvQNceiVOLFTAnMkoCx+QKBgAb2mM79q28zd7XNiFY1\nnGXp/EiCF0dfxSCsOwIuGoW0UtRowXHepMtoocgNJ36Jk5obMrtXuambZOFYYDIr\nLC1X5nYhYzJfRIQpEl/KUhHYBY//MhJ//ZewhwfsuT7/yghQwM5q1Pkn8Sjc+KXU\n4XLKCkg1yH2r1RkONjs2uRZj\n-----END PRIVATE KEY-----\n"),//process.env.GA_PRIVATE_KEY as string,
            // getPrivKeyFormatted(process.env.GA_PRIVATE_KEY as string),
            ['https://www.googleapis.com/auth/analytics.readonly'],
        );

        console.log(`1: ${gaJWTAuth}`)

        try {

            const analyticsReporting = google.analyticsreporting({
                version: 'v4',
                auth: gaJWTAuth,
            });

            console.log(`2: ${analyticsReporting}`)

            const result = await analyticsReporting.reports.batchGet({
                requestBody: {
                    reportRequests: [
                        {
                            viewId: 'ga:',
                            dateRanges: [
                                {
                                    startDate: params['days-prev'],
                                    endDate: 'today',
                                },
                            ],
                            metrics: [
                                {
                                    expression: 'ga:pageviews',
                                },
                            ],
                            dimensions: [
                                {
                                    name: 'ga:pagePath',
                                },
                                {
                                    name: 'ga:pageTitle',
                                },
                            ],
                            orderBys: [
                                {
                                    sortOrder: 'DESCENDING',
                                    fieldName: 'ga:pageviews',
                                },
                            ],
                            // dimensionFilterClauses: [
                            //     {
                            //         filters: [
                            //             {
                            //                 dimensionName: 'ga:pagePath',
                            //                 operator: 'REGEXP',
                            //                 expressions: ['/blog/'],
                            //             },
                            //         ],
                            //     },
                            // ],
                            pageSize: params.top,
                        },
                    ],
                },
            });

            console.log(`3: ${result}`)

            const data = result.data.reports![0].data;

            const posts = data!.rows!.map((post) => {
                const { dimensions, metrics } = post;

                const path = dimensions![0];
                const title = dimensions![1];
                const views = metrics![0].values![0];

                return [path, title, views];
            });

            const gaGetPostsDetail: GAGetPostsDetail = {
                rows: posts
            };

            console.log(`4: ${gaGetPostsDetail}`)

            return {
                isSuccess: true,
                type: 'getPosts',
                body: gaGetPostsDetail,
            } as GAGetPostsResponse;
        } catch (err) {
            return {
                isSuccess: false,
                type: 'getPosts',
                body: 'Error retrieving data from Google Analytics.',
            } as GAGetPostsResponse;

            console.log(err);
        }
    }
}