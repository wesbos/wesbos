export interface TikTokResponse {
  __DEFAULT_SCOPE__: {
    'webapp.video-detail': {
      itemInfo: {
        itemStruct: TiktokDetails;
      };
    };
  };
}
export interface TiktokDetails {
  id: string;
  desc: string;
  createTime: string;
  scheduleTime: number;
  video: Video;
  author: Author;
  music: Music;
  challenges: Challenge[];
  stats: Stats;
  statsV2: StatsV2;
  warnInfo: any[];
  originalItem: boolean;
  officalItem: boolean;
  textExtra: TextExtra[];
  secret: boolean;
  forFriend: boolean;
  digged: boolean;
  itemCommentStatus: number;
  takeDown: number;
  effectStickers: any[];
  authorStats: AuthorStats;
  privateItem: boolean;
  stickersOnItem: any[];
  shareEnabled: boolean;
  comments: any[];
  duetDisplay: number;
  stitchDisplay: number;
  indexEnabled: boolean;
  diversificationLabels: string[];
  locationCreated: string;
  suggestedWords: string[];
  contents: Content[];
  diversificationId: number;
  collected: boolean;
  channelTags: any[];
  item_control: Itemcontrol;
  IsAigc: boolean;
  AIGCDescription: string;
  backendSourceEventTracking: string;
  CategoryType: number;
  textLanguage: string;
  textTranslatable: boolean;
}
interface Itemcontrol {
  can_repost: boolean;
}
interface Content {
  desc: string;
  textExtra: TextExtra[];
}
interface AuthorStats {
  followerCount: number;
  followingCount: number;
  heart: number;
  heartCount: number;
  videoCount: number;
  diggCount: number;
  friendCount: number;
}
interface TextExtra {
  awemeId: string;
  start: number;
  end: number;
  hashtagId: string;
  hashtagName: string;
  type: number;
  subType: number;
  isCommerce: boolean;
}
interface StatsV2 {
  diggCount: string;
  shareCount: string;
  commentCount: string;
  playCount: string;
  collectCount: string;
  repostCount: string;
}
interface Stats {
  diggCount: number;
  shareCount: number;
  commentCount: number;
  playCount: number;
  collectCount: string;
}
interface Challenge {
  id: string;
  title: string;
  desc: string;
  profileLarger: string;
  profileMedium: string;
  profileThumb: string;
  coverLarger: string;
  coverMedium: string;
  coverThumb: string;
}
interface Music {
  id: string;
  title: string;
  playUrl: string;
  coverLarge: string;
  coverMedium: string;
  coverThumb: string;
  authorName: string;
  original: boolean;
  duration: number;
  scheduleSearchTime: number;
  collected: boolean;
  preciseDuration: PreciseDuration;
}
interface PreciseDuration {
  preciseDuration: number;
  preciseShootDuration: number;
  preciseAuditionDuration: number;
  preciseVideoDuration: number;
}
interface Author {
  id: string;
  shortId: string;
  uniqueId: string;
  nickname: string;
  avatarLarger: string;
  avatarMedium: string;
  avatarThumb: string;
  signature: string;
  createTime: number;
  verified: boolean;
  secUid: string;
  ftc: boolean;
  relation: number;
  openFavorite: boolean;
  commentSetting: number;
  duetSetting: number;
  stitchSetting: number;
  privateAccount: boolean;
  secret: boolean;
  isADVirtual: boolean;
  roomId: string;
  uniqueIdModifyTime: number;
  ttSeller: boolean;
  downloadSetting: number;
  recommendReason: string;
  nowInvitationCardUrl: string;
  nickNameModifyTime: number;
  isEmbedBanned: boolean;
  canExpPlaylist: boolean;
  suggestAccountBind: boolean;
}
interface Video {
  id: string;
  height: number;
  width: number;
  duration: number;
  ratio: string;
  cover: string;
  originCover: string;
  dynamicCover: string;
  playAddr: string;
  downloadAddr: string;
  shareCover: string[];
  reflowCover: string;
  bitrate: number;
  encodedType: string;
  format: string;
  videoQuality: string;
  encodeUserTag: string;
  codecType: string;
  definition: string;
  subtitleInfos: SubtitleInfo[];
  zoomCover: ZoomCover;
  volumeInfo: VolumeInfo;
  bitrateInfo: BitrateInfo[];
  VQScore: string;
  claInfo: ClaInfo;
}
interface ClaInfo {
  hasOriginalAudio: boolean;
  enableAutoCaption: boolean;
  originalLanguageInfo: OriginalLanguageInfo;
  captionInfos: CaptionInfo[];
  captionsType: string;
  noCaptionReason?: any;
}
interface CaptionInfo {
  language: string;
  languageID: string;
  url: string;
  expire: string;
  captionFormat: string;
  isAutoGen: boolean;
  subID: string;
  claSubtitleID: string;
  languageCode: string;
  isOriginalCaption: boolean;
  urlList: string[];
  variant: string;
  subtitleType: string;
  translationType: string;
}
interface OriginalLanguageInfo {
  language: string;
  languageID: string;
  languageCode: string;
  canTranslateRealTimeNoCheck: boolean;
}
interface BitrateInfo {
  Bitrate: number;
  QualityType: number;
  GearName: string;
  PlayAddr: PlayAddr;
  CodecType: string;
  MVMAF: string;
}
interface PlayAddr {
  DataSize: string;
  Width: number;
  Height: number;
  Uri: string;
  UrlList: string[];
  UrlKey: string;
  FileHash: string;
  FileCs: string;
}
interface VolumeInfo {
  Loudness: number;
  Peak: number;
}
interface ZoomCover {
  '240': string;
  '480': string;
  '720': string;
  '960': string;
}
interface SubtitleInfo {
  UrlExpire: string;
  Size: string;
  LanguageID: string;
  LanguageCodeName: string;
  Url: string;
  Format: string;
  Version: string;
  Source: string;
}
