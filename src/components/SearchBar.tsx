"use client";

import { FC, useCallback, useState } from "react";
import {
	Command,
	CommandInput,
	CommandEmpty,
	CommandGroup,
	CommandList,
	CommandItem,
} from "./ui/Command";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma, Report } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";
import debounce from "lodash.debounce";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
	const [input, setInput] = useState<string>("");
	const router = useRouter();

	const request = debounce(async () => {
		refetch();
	}, 300);

	const debounceRequest = useCallback(() => {
		request();
	}, []);

	const {
		data: queryResults,
		refetch,
		isFetched,
		isFetching,
	} = useQuery({
		queryFn: async () => {
			if (!input) return [];
			const { data } = await axios.get(`api/search?q=${input}`);
			return data as (Report & {
				_count: Prisma.ReportCountOutputType;
			})[];
		},
		queryKey: ["search-query"],
		enabled: false,
	});

	return (
		<Command className='relative rounded-lg max-w-lg z-50 overflow-visible'>
			<CommandInput
				value={input}
				onValueChange={(text) => {
					setInput(text);
					debounceRequest();
				}}
				className='outline-none border-none focus:border-none focus:outline-none ring-0'
				placeholder='Search report location "B12"...'
			/>
			{input.length > 0 ? (
				<CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
					{isFetched && <CommandEmpty>No result found.</CommandEmpty>}
					{(queryResults?.length ?? 0) > 0 ? (
						<CommandGroup heading='Location'>
							{queryResults?.map((report) => (
								<CommandItem
									onSelect={(e) => {
										router.push(`/fr/${e}`);
										router.refresh();
									}}
									key={report.id}
									value={report.name}
								>
									<Building className='mr-2 h-4 w-4' />
									<a href={`/fr/${report.name}`}>{report.name}</a>
								</CommandItem>
							))}
						</CommandGroup>
					) : null}
				</CommandList>
			) : null}
		</Command>
	);
};

export default SearchBar;
