import { UniClient, UniRequestError, UniResponse } from './client';
import { UniSigner } from './signer';
import { UniConfig, UniSigningAlgorithm } from './types';
declare const Uni: {
    Client: typeof UniClient;
};
export { UniConfig, UniClient, UniSigner, UniSigningAlgorithm, UniRequestError, UniResponse, };
export default Uni;
