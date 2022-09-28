package uz.tashkec.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.IntegrationTest;
import uz.tashkec.domain.Attachment;
import uz.tashkec.repository.AttachmentRepository;
import uz.tashkec.service.dto.AttachmentDTO;
import uz.tashkec.service.mapper.AttachmentMapper;

/**
 * Integration tests for the {@link AttachmentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AttachmentResourceIT {

    private static final String DEFAULT_FILE_NAME_UZ = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME_UZ = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_NAME_RU = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME_RU = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_NAME_KR = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME_KR = "BBBBBBBBBB";

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_ORIGINAL_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ORIGINAL_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_FILE_SIZE = 1;
    private static final Integer UPDATED_FILE_SIZE = 2;

    private static final String DEFAULT_SUFFIX = "AAAAAAAA";
    private static final String UPDATED_SUFFIX = "BBBBBBBB";

    private static final String DEFAULT_THUMBNAIL_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_THUMBNAIL_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUCKET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BUCKET_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/attachments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private AttachmentMapper attachmentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAttachmentMockMvc;

    private Attachment attachment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attachment createEntity(EntityManager em) {
        Attachment attachment = new Attachment()
            .fileNameUz(DEFAULT_FILE_NAME_UZ)
            .fileNameRu(DEFAULT_FILE_NAME_RU)
            .fileNameKr(DEFAULT_FILE_NAME_KR)
            .path(DEFAULT_PATH)
            .originalFileName(DEFAULT_ORIGINAL_FILE_NAME)
            .contentType(DEFAULT_CONTENT_TYPE)
            .fileSize(DEFAULT_FILE_SIZE)
            .suffix(DEFAULT_SUFFIX)
            .thumbnailFileName(DEFAULT_THUMBNAIL_FILE_NAME)
            .bucketName(DEFAULT_BUCKET_NAME);
        return attachment;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attachment createUpdatedEntity(EntityManager em) {
        Attachment attachment = new Attachment()
            .fileNameUz(UPDATED_FILE_NAME_UZ)
            .fileNameRu(UPDATED_FILE_NAME_RU)
            .fileNameKr(UPDATED_FILE_NAME_KR)
            .path(UPDATED_PATH)
            .originalFileName(UPDATED_ORIGINAL_FILE_NAME)
            .contentType(UPDATED_CONTENT_TYPE)
            .fileSize(UPDATED_FILE_SIZE)
            .suffix(UPDATED_SUFFIX)
            .thumbnailFileName(UPDATED_THUMBNAIL_FILE_NAME)
            .bucketName(UPDATED_BUCKET_NAME);
        return attachment;
    }

    @BeforeEach
    public void initTest() {
        attachment = createEntity(em);
    }

    @Test
    @Transactional
    void createAttachment() throws Exception {
        int databaseSizeBeforeCreate = attachmentRepository.findAll().size();
        // Create the Attachment
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(attachment);
        restAttachmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attachmentDTO)))
            .andExpect(status().isCreated());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeCreate + 1);
        Attachment testAttachment = attachmentList.get(attachmentList.size() - 1);
        assertThat(testAttachment.getFileNameUz()).isEqualTo(DEFAULT_FILE_NAME_UZ);
        assertThat(testAttachment.getFileNameRu()).isEqualTo(DEFAULT_FILE_NAME_RU);
        assertThat(testAttachment.getFileNameKr()).isEqualTo(DEFAULT_FILE_NAME_KR);
        assertThat(testAttachment.getPath()).isEqualTo(DEFAULT_PATH);
        assertThat(testAttachment.getOriginalFileName()).isEqualTo(DEFAULT_ORIGINAL_FILE_NAME);
        assertThat(testAttachment.getContentType()).isEqualTo(DEFAULT_CONTENT_TYPE);
        assertThat(testAttachment.getFileSize()).isEqualTo(DEFAULT_FILE_SIZE);
        assertThat(testAttachment.getSuffix()).isEqualTo(DEFAULT_SUFFIX);
        assertThat(testAttachment.getThumbnailFileName()).isEqualTo(DEFAULT_THUMBNAIL_FILE_NAME);
        assertThat(testAttachment.getBucketName()).isEqualTo(DEFAULT_BUCKET_NAME);
    }

    @Test
    @Transactional
    void createAttachmentWithExistingId() throws Exception {
        // Create the Attachment with an existing ID
        attachment.setId(1L);
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(attachment);

        int databaseSizeBeforeCreate = attachmentRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttachmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attachmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAttachments() throws Exception {
        // Initialize the database
        attachmentRepository.saveAndFlush(attachment);

        // Get all the attachmentList
        restAttachmentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attachment.getId().intValue())))
            .andExpect(jsonPath("$.[*].fileNameUz").value(hasItem(DEFAULT_FILE_NAME_UZ)))
            .andExpect(jsonPath("$.[*].fileNameRu").value(hasItem(DEFAULT_FILE_NAME_RU)))
            .andExpect(jsonPath("$.[*].fileNameKr").value(hasItem(DEFAULT_FILE_NAME_KR)))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH)))
            .andExpect(jsonPath("$.[*].originalFileName").value(hasItem(DEFAULT_ORIGINAL_FILE_NAME)))
            .andExpect(jsonPath("$.[*].contentType").value(hasItem(DEFAULT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fileSize").value(hasItem(DEFAULT_FILE_SIZE)))
            .andExpect(jsonPath("$.[*].suffix").value(hasItem(DEFAULT_SUFFIX)))
            .andExpect(jsonPath("$.[*].thumbnailFileName").value(hasItem(DEFAULT_THUMBNAIL_FILE_NAME)))
            .andExpect(jsonPath("$.[*].bucketName").value(hasItem(DEFAULT_BUCKET_NAME)));
    }

    @Test
    @Transactional
    void getAttachment() throws Exception {
        // Initialize the database
        attachmentRepository.saveAndFlush(attachment);

        // Get the attachment
        restAttachmentMockMvc
            .perform(get(ENTITY_API_URL_ID, attachment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(attachment.getId().intValue()))
            .andExpect(jsonPath("$.fileNameUz").value(DEFAULT_FILE_NAME_UZ))
            .andExpect(jsonPath("$.fileNameRu").value(DEFAULT_FILE_NAME_RU))
            .andExpect(jsonPath("$.fileNameKr").value(DEFAULT_FILE_NAME_KR))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH))
            .andExpect(jsonPath("$.originalFileName").value(DEFAULT_ORIGINAL_FILE_NAME))
            .andExpect(jsonPath("$.contentType").value(DEFAULT_CONTENT_TYPE))
            .andExpect(jsonPath("$.fileSize").value(DEFAULT_FILE_SIZE))
            .andExpect(jsonPath("$.suffix").value(DEFAULT_SUFFIX))
            .andExpect(jsonPath("$.thumbnailFileName").value(DEFAULT_THUMBNAIL_FILE_NAME))
            .andExpect(jsonPath("$.bucketName").value(DEFAULT_BUCKET_NAME));
    }

    @Test
    @Transactional
    void getNonExistingAttachment() throws Exception {
        // Get the attachment
        restAttachmentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAttachment() throws Exception {
        // Initialize the database
        attachmentRepository.saveAndFlush(attachment);

        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();

        // Update the attachment
        Attachment updatedAttachment = attachmentRepository.findById(attachment.getId()).get();
        // Disconnect from session so that the updates on updatedAttachment are not directly saved in db
        em.detach(updatedAttachment);
        updatedAttachment
            .fileNameUz(UPDATED_FILE_NAME_UZ)
            .fileNameRu(UPDATED_FILE_NAME_RU)
            .fileNameKr(UPDATED_FILE_NAME_KR)
            .path(UPDATED_PATH)
            .originalFileName(UPDATED_ORIGINAL_FILE_NAME)
            .contentType(UPDATED_CONTENT_TYPE)
            .fileSize(UPDATED_FILE_SIZE)
            .suffix(UPDATED_SUFFIX)
            .thumbnailFileName(UPDATED_THUMBNAIL_FILE_NAME)
            .bucketName(UPDATED_BUCKET_NAME);
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(updatedAttachment);

        restAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, attachmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(attachmentDTO))
            )
            .andExpect(status().isOk());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
        Attachment testAttachment = attachmentList.get(attachmentList.size() - 1);
        assertThat(testAttachment.getFileNameUz()).isEqualTo(UPDATED_FILE_NAME_UZ);
        assertThat(testAttachment.getFileNameRu()).isEqualTo(UPDATED_FILE_NAME_RU);
        assertThat(testAttachment.getFileNameKr()).isEqualTo(UPDATED_FILE_NAME_KR);
        assertThat(testAttachment.getPath()).isEqualTo(UPDATED_PATH);
        assertThat(testAttachment.getOriginalFileName()).isEqualTo(UPDATED_ORIGINAL_FILE_NAME);
        assertThat(testAttachment.getContentType()).isEqualTo(UPDATED_CONTENT_TYPE);
        assertThat(testAttachment.getFileSize()).isEqualTo(UPDATED_FILE_SIZE);
        assertThat(testAttachment.getSuffix()).isEqualTo(UPDATED_SUFFIX);
        assertThat(testAttachment.getThumbnailFileName()).isEqualTo(UPDATED_THUMBNAIL_FILE_NAME);
        assertThat(testAttachment.getBucketName()).isEqualTo(UPDATED_BUCKET_NAME);
    }

    @Test
    @Transactional
    void putNonExistingAttachment() throws Exception {
        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();
        attachment.setId(count.incrementAndGet());

        // Create the Attachment
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(attachment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, attachmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(attachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAttachment() throws Exception {
        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();
        attachment.setId(count.incrementAndGet());

        // Create the Attachment
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(attachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(attachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAttachment() throws Exception {
        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();
        attachment.setId(count.incrementAndGet());

        // Create the Attachment
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(attachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttachmentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(attachmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAttachmentWithPatch() throws Exception {
        // Initialize the database
        attachmentRepository.saveAndFlush(attachment);

        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();

        // Update the attachment using partial update
        Attachment partialUpdatedAttachment = new Attachment();
        partialUpdatedAttachment.setId(attachment.getId());

        partialUpdatedAttachment
            .fileNameRu(UPDATED_FILE_NAME_RU)
            .path(UPDATED_PATH)
            .fileSize(UPDATED_FILE_SIZE)
            .suffix(UPDATED_SUFFIX)
            .thumbnailFileName(UPDATED_THUMBNAIL_FILE_NAME);

        restAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAttachment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAttachment))
            )
            .andExpect(status().isOk());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
        Attachment testAttachment = attachmentList.get(attachmentList.size() - 1);
        assertThat(testAttachment.getFileNameUz()).isEqualTo(DEFAULT_FILE_NAME_UZ);
        assertThat(testAttachment.getFileNameRu()).isEqualTo(UPDATED_FILE_NAME_RU);
        assertThat(testAttachment.getFileNameKr()).isEqualTo(DEFAULT_FILE_NAME_KR);
        assertThat(testAttachment.getPath()).isEqualTo(UPDATED_PATH);
        assertThat(testAttachment.getOriginalFileName()).isEqualTo(DEFAULT_ORIGINAL_FILE_NAME);
        assertThat(testAttachment.getContentType()).isEqualTo(DEFAULT_CONTENT_TYPE);
        assertThat(testAttachment.getFileSize()).isEqualTo(UPDATED_FILE_SIZE);
        assertThat(testAttachment.getSuffix()).isEqualTo(UPDATED_SUFFIX);
        assertThat(testAttachment.getThumbnailFileName()).isEqualTo(UPDATED_THUMBNAIL_FILE_NAME);
        assertThat(testAttachment.getBucketName()).isEqualTo(DEFAULT_BUCKET_NAME);
    }

    @Test
    @Transactional
    void fullUpdateAttachmentWithPatch() throws Exception {
        // Initialize the database
        attachmentRepository.saveAndFlush(attachment);

        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();

        // Update the attachment using partial update
        Attachment partialUpdatedAttachment = new Attachment();
        partialUpdatedAttachment.setId(attachment.getId());

        partialUpdatedAttachment
            .fileNameUz(UPDATED_FILE_NAME_UZ)
            .fileNameRu(UPDATED_FILE_NAME_RU)
            .fileNameKr(UPDATED_FILE_NAME_KR)
            .path(UPDATED_PATH)
            .originalFileName(UPDATED_ORIGINAL_FILE_NAME)
            .contentType(UPDATED_CONTENT_TYPE)
            .fileSize(UPDATED_FILE_SIZE)
            .suffix(UPDATED_SUFFIX)
            .thumbnailFileName(UPDATED_THUMBNAIL_FILE_NAME)
            .bucketName(UPDATED_BUCKET_NAME);

        restAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAttachment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAttachment))
            )
            .andExpect(status().isOk());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
        Attachment testAttachment = attachmentList.get(attachmentList.size() - 1);
        assertThat(testAttachment.getFileNameUz()).isEqualTo(UPDATED_FILE_NAME_UZ);
        assertThat(testAttachment.getFileNameRu()).isEqualTo(UPDATED_FILE_NAME_RU);
        assertThat(testAttachment.getFileNameKr()).isEqualTo(UPDATED_FILE_NAME_KR);
        assertThat(testAttachment.getPath()).isEqualTo(UPDATED_PATH);
        assertThat(testAttachment.getOriginalFileName()).isEqualTo(UPDATED_ORIGINAL_FILE_NAME);
        assertThat(testAttachment.getContentType()).isEqualTo(UPDATED_CONTENT_TYPE);
        assertThat(testAttachment.getFileSize()).isEqualTo(UPDATED_FILE_SIZE);
        assertThat(testAttachment.getSuffix()).isEqualTo(UPDATED_SUFFIX);
        assertThat(testAttachment.getThumbnailFileName()).isEqualTo(UPDATED_THUMBNAIL_FILE_NAME);
        assertThat(testAttachment.getBucketName()).isEqualTo(UPDATED_BUCKET_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingAttachment() throws Exception {
        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();
        attachment.setId(count.incrementAndGet());

        // Create the Attachment
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(attachment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, attachmentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(attachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAttachment() throws Exception {
        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();
        attachment.setId(count.incrementAndGet());

        // Create the Attachment
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(attachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(attachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAttachment() throws Exception {
        int databaseSizeBeforeUpdate = attachmentRepository.findAll().size();
        attachment.setId(count.incrementAndGet());

        // Create the Attachment
        AttachmentDTO attachmentDTO = attachmentMapper.toDto(attachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(attachmentDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Attachment in the database
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAttachment() throws Exception {
        // Initialize the database
        attachmentRepository.saveAndFlush(attachment);

        int databaseSizeBeforeDelete = attachmentRepository.findAll().size();

        // Delete the attachment
        restAttachmentMockMvc
            .perform(delete(ENTITY_API_URL_ID, attachment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Attachment> attachmentList = attachmentRepository.findAll();
        assertThat(attachmentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
