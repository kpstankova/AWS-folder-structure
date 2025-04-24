import { HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, S3 } from "@aws-sdk/client-s3";

import { rootFolderKey } from "./constants";
import { FileTreeItem, FileTreeItemType } from "./components/FileTreeItem/types";

export const doesFolderExist = async (s3Client: S3, bucketName: string, key: string) => {
	try {
		const { Metadata } = await s3Client.send(
			new HeadObjectCommand({
				Bucket: bucketName,
				Key: key,
			}),
		);

		return !!Metadata;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const createItem = async (
	s3Client: S3,
	bucketName: string,
	key: string,
	type: FileTreeItemType,
) => {
	try {
		await s3Client.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: `${key}${type === FileTreeItemType.Folder ? "/" : ""}`,
				Body: "",
			}),
		);
	} catch (e) {
		console.log(e);
	}
};

export const createRootFolder = async (s3Client: S3, bucketName: string) => {
	const hasRootFolder = await doesFolderExist(s3Client, bucketName, `${rootFolderKey}/`);

	if (!hasRootFolder) {
		createItem(s3Client, bucketName, rootFolderKey, FileTreeItemType.Folder);
	}
};

export const getFileItems = (s3Keys: Array<string>) => {
	const root: Array<FileTreeItem> = [];

	s3Keys.forEach((key) => {
		let normalizedKey = key;
		if (normalizedKey.endsWith("/")) {
			normalizedKey = normalizedKey.slice(0, -1);
		}

		const pathParts = normalizedKey.split("/").filter((nKey) => nKey !== "");

		const isFolder = key.endsWith("/");
		let currentLevel = root;
		let fullPath = "";

		pathParts.forEach((part, index) => {
			const isLast = index === pathParts.length - 1;
			const type = isLast && !isFolder ? FileTreeItemType.File : FileTreeItemType.Folder;

			let node = currentLevel.find((n) => n.name === part);

			if (!node) {
				node = {
					name: part,
					type,
					fullPath: fullPath + part + "/",
				};

				if (type === FileTreeItemType.Folder) {
					node.children = [];
				}

				currentLevel.push(node);
			}

			if (node.type === FileTreeItemType.Folder) {
				currentLevel = node.children!;
			}

			fullPath = node.fullPath;
		});
	});

	return root;
};

export const fetchFiles = async (s3Client: S3, bucketName: string) => {
	const command = new ListObjectsV2Command({ Bucket: bucketName });
	try {
		const data = await s3Client?.send(command);
		if (data?.Contents) {
			return getFileItems(data?.Contents?.map((file) => file.Key!));
		}
		return [];
	} catch (err) {
		console.error("Error fetching files:", err);
		return [];
	}
};
