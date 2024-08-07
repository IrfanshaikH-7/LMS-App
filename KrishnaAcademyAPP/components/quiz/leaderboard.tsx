import { Text, FlatList, SafeAreaView } from "react-native";

import React, { useState } from "react";
interface Props {
	total_score: number;
	user_id: string;
}

export default function LeaderboardScreen() {
	const [leaderboard, setLeaderboard] = useState<Props[]>([]);

	return (
		<SafeAreaView className='flex-1 bg-orange-100 p-4'>
			<Text className='text-2xl font-bold text-gray-500 text-center mb-6'>
				Leaderboard
			</Text>

			{/* <FlatList
				data={leaderboard}
				renderItem={({ item }) => <Board item={item} />}
				keyExtractor={(item) => item.user_id}
				showsVerticalScrollIndicator={false}
			/> */}
		</SafeAreaView>
	);
}