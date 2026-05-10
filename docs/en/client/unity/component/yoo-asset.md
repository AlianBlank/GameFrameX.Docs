# YooAsset

[[toc]]
---

## Introduction

This library references the official `YooAsset` library from TuYou.

Since the framework targets indie game developers, the asset volume is not expected to be very large. Therefore, only the Built-in build pipeline has been retained.

### Changelog

- [Removed] Removed the RawFile Pipeline and Script Build Pipeline build pipelines.
- [Added] Added a shortcut button for automatically generating a new version number. The version number format is the current date + local time.
- [Fixed] Fixed an issue where Raw assets under the Built-in pipeline could not be built and loaded in the official version. This was caused by the removal of other pipelines.
- [Fixed] Modified the exported asset package directory to prepend the application ID + version number. This resolves the issue of old resources being deleted when a new version is released with an incremented version number.
- [Fixed] Fixed a download exception in the WeChat Mini Game full CDN mode caused by the WeChat Mini Game SDK.

## How to Use

Please refer to the [`Official Documentation`](https://www.yooasset.com)
