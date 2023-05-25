import { Box } from '@chakra-ui/react';
import { useAccount, useContractRead, useContractReads } from 'wagmi';
import { nftABI, nftContractAddress } from '../../../utils/nftABI.ts';
import NftItemSection from '../nftItemSection/NftItemSection.tsx';

export default function NftsList() {
  const { address } = useAccount();

  const { data: nftsList = [], isLoading: nftsListIsLoading } = useContractRead({
    address: nftContractAddress,
    abi: nftABI,
    functionName: 'getUserNFTS',
    watch: true,
    args: [address || '0x000000'],
  });

  const { data: tokenURIList, isLoading: tokenURIListIsLoading } = useContractReads({
    contracts: nftsList.map((nft: bigint) => ({
      address: nftContractAddress,
      abi: nftABI,
      functionName: 'tokenURI',
      args: [nft],
    })),
  });

  return (
    // <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacingX={12} spacingY={20} py={12}>
    //   {nftsListIsLoading || tokenURIListIsLoading ? (
    //     <div>Loading...</div>
    //   ) : (
    //     <>
    //       {tokenURIList?.length === 0 ? (
    //         <Box display="flex" justifyContent="center">
    //           No NFTs found
    //         </Box>
    //       ) : (
    //         tokenURIList
    //           ?.filter((el) => el.result)
    //           ?.map((nft, idx) => (
    //             <NftCard
    //               key={idx}
    //               nftURI={`https://ipfs.io/ipfs/${(nft.result as string).split('//')[1]}`}
    //             />
    //           ))
    //       )}
    //     </>
    //   )}
    // </SimpleGrid>
    <>
      {nftsListIsLoading || tokenURIListIsLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {tokenURIList?.length === 0 ? (
            <Box display="flex" justifyContent="center">
              No NFTs found
            </Box>
          ) : (
            tokenURIList
              ?.filter((el) => el.result)
              ?.map((nft, idx) => (
                <NftItemSection
                  key={idx}
                  nftURI={`https://ipfs.io/ipfs/${(nft.result as string).split('//')[1]}`}
                />
              ))
          )}
        </>
      )}
    </>
  );
}
