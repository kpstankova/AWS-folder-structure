import {
	DeleteObjectCommand,
	DeleteObjectsCommand,
	ListObjectsV2Command,
	S3,
} from "@aws-sdk/client-s3";
import { FileTreeItemType } from "../FileTreeItem/types";

export const deleteItem = async (
	bucketName: string,
	file: string,
	s3Client: S3,
	type: FileTreeItemType | undefined,
) => {
	try {
		const isFolder = type === FileTreeItemType.Folder;

		const listedObjects = await s3Client.send(
			new ListObjectsV2Command({
				Bucket: bucketName,
				Prefix: file,
			}),
		);

		const keysToDelete = listedObjects.Contents?.map((obj) => ({ Key: obj.Key! })) ?? [];

		if (keysToDelete.length > 0) {
			await s3Client.send(
				new DeleteObjectsCommand({
					Bucket: bucketName,
					Delete: { Objects: keysToDelete },
				}),
			);
		}

		await s3Client.send(
			new DeleteObjectCommand({
				Bucket: bucketName,
				Key: isFolder ? file : file.slice(0, -1),
			}),
		);

		alert(`Deleted "${file}" successfully.`);
	} catch (err) {
		console.error("Delete failed:", err);
		alert("Delete failed.");
	}
};
