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
import uz.tashkec.domain.KoreanCulture;
import uz.tashkec.repository.KoreanCultureRepository;
import uz.tashkec.service.dto.KoreanCultureDTO;
import uz.tashkec.service.mapper.KoreanCultureMapper;

/**
 * Integration tests for the {@link KoreanCultureResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KoreanCultureResourceIT {

    private static final String DEFAULT_TITLE_UZ = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_UZ = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_RU = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_RU = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_KR = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_KR = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_UZ = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_UZ = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_RU = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_RU = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_KR = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_KR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/korean-cultures";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KoreanCultureRepository koreanCultureRepository;

    @Autowired
    private KoreanCultureMapper koreanCultureMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKoreanCultureMockMvc;

    private KoreanCulture koreanCulture;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KoreanCulture createEntity(EntityManager em) {
        KoreanCulture koreanCulture = new KoreanCulture()
            .titleUz(DEFAULT_TITLE_UZ)
            .titleRu(DEFAULT_TITLE_RU)
            .titleKr(DEFAULT_TITLE_KR)
            .contentUz(DEFAULT_CONTENT_UZ)
            .contentRu(DEFAULT_CONTENT_RU)
            .contentKr(DEFAULT_CONTENT_KR);
        return koreanCulture;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KoreanCulture createUpdatedEntity(EntityManager em) {
        KoreanCulture koreanCulture = new KoreanCulture()
            .titleUz(UPDATED_TITLE_UZ)
            .titleRu(UPDATED_TITLE_RU)
            .titleKr(UPDATED_TITLE_KR)
            .contentUz(UPDATED_CONTENT_UZ)
            .contentRu(UPDATED_CONTENT_RU)
            .contentKr(UPDATED_CONTENT_KR);
        return koreanCulture;
    }

    @BeforeEach
    public void initTest() {
        koreanCulture = createEntity(em);
    }

    @Test
    @Transactional
    void createKoreanCulture() throws Exception {
        int databaseSizeBeforeCreate = koreanCultureRepository.findAll().size();
        // Create the KoreanCulture
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(koreanCulture);
        restKoreanCultureMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isCreated());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeCreate + 1);
        KoreanCulture testKoreanCulture = koreanCultureList.get(koreanCultureList.size() - 1);
        assertThat(testKoreanCulture.getTitleUz()).isEqualTo(DEFAULT_TITLE_UZ);
        assertThat(testKoreanCulture.getTitleRu()).isEqualTo(DEFAULT_TITLE_RU);
        assertThat(testKoreanCulture.getTitleKr()).isEqualTo(DEFAULT_TITLE_KR);
        assertThat(testKoreanCulture.getContentUz()).isEqualTo(DEFAULT_CONTENT_UZ);
        assertThat(testKoreanCulture.getContentRu()).isEqualTo(DEFAULT_CONTENT_RU);
        assertThat(testKoreanCulture.getContentKr()).isEqualTo(DEFAULT_CONTENT_KR);
    }

    @Test
    @Transactional
    void createKoreanCultureWithExistingId() throws Exception {
        // Create the KoreanCulture with an existing ID
        koreanCulture.setId(1L);
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(koreanCulture);

        int databaseSizeBeforeCreate = koreanCultureRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKoreanCultureMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllKoreanCultures() throws Exception {
        // Initialize the database
        koreanCultureRepository.saveAndFlush(koreanCulture);

        // Get all the koreanCultureList
        restKoreanCultureMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(koreanCulture.getId().intValue())))
            .andExpect(jsonPath("$.[*].titleUz").value(hasItem(DEFAULT_TITLE_UZ)))
            .andExpect(jsonPath("$.[*].titleRu").value(hasItem(DEFAULT_TITLE_RU)))
            .andExpect(jsonPath("$.[*].titleKr").value(hasItem(DEFAULT_TITLE_KR)))
            .andExpect(jsonPath("$.[*].contentUz").value(hasItem(DEFAULT_CONTENT_UZ)))
            .andExpect(jsonPath("$.[*].contentRu").value(hasItem(DEFAULT_CONTENT_RU)))
            .andExpect(jsonPath("$.[*].contentKr").value(hasItem(DEFAULT_CONTENT_KR)));
    }

    @Test
    @Transactional
    void getKoreanCulture() throws Exception {
        // Initialize the database
        koreanCultureRepository.saveAndFlush(koreanCulture);

        // Get the koreanCulture
        restKoreanCultureMockMvc
            .perform(get(ENTITY_API_URL_ID, koreanCulture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(koreanCulture.getId().intValue()))
            .andExpect(jsonPath("$.titleUz").value(DEFAULT_TITLE_UZ))
            .andExpect(jsonPath("$.titleRu").value(DEFAULT_TITLE_RU))
            .andExpect(jsonPath("$.titleKr").value(DEFAULT_TITLE_KR))
            .andExpect(jsonPath("$.contentUz").value(DEFAULT_CONTENT_UZ))
            .andExpect(jsonPath("$.contentRu").value(DEFAULT_CONTENT_RU))
            .andExpect(jsonPath("$.contentKr").value(DEFAULT_CONTENT_KR));
    }

    @Test
    @Transactional
    void getNonExistingKoreanCulture() throws Exception {
        // Get the koreanCulture
        restKoreanCultureMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingKoreanCulture() throws Exception {
        // Initialize the database
        koreanCultureRepository.saveAndFlush(koreanCulture);

        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();

        // Update the koreanCulture
        KoreanCulture updatedKoreanCulture = koreanCultureRepository.findById(koreanCulture.getId()).get();
        // Disconnect from session so that the updates on updatedKoreanCulture are not directly saved in db
        em.detach(updatedKoreanCulture);
        updatedKoreanCulture
            .titleUz(UPDATED_TITLE_UZ)
            .titleRu(UPDATED_TITLE_RU)
            .titleKr(UPDATED_TITLE_KR)
            .contentUz(UPDATED_CONTENT_UZ)
            .contentRu(UPDATED_CONTENT_RU)
            .contentKr(UPDATED_CONTENT_KR);
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(updatedKoreanCulture);

        restKoreanCultureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, koreanCultureDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isOk());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
        KoreanCulture testKoreanCulture = koreanCultureList.get(koreanCultureList.size() - 1);
        assertThat(testKoreanCulture.getTitleUz()).isEqualTo(UPDATED_TITLE_UZ);
        assertThat(testKoreanCulture.getTitleRu()).isEqualTo(UPDATED_TITLE_RU);
        assertThat(testKoreanCulture.getTitleKr()).isEqualTo(UPDATED_TITLE_KR);
        assertThat(testKoreanCulture.getContentUz()).isEqualTo(UPDATED_CONTENT_UZ);
        assertThat(testKoreanCulture.getContentRu()).isEqualTo(UPDATED_CONTENT_RU);
        assertThat(testKoreanCulture.getContentKr()).isEqualTo(UPDATED_CONTENT_KR);
    }

    @Test
    @Transactional
    void putNonExistingKoreanCulture() throws Exception {
        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();
        koreanCulture.setId(count.incrementAndGet());

        // Create the KoreanCulture
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(koreanCulture);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKoreanCultureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, koreanCultureDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKoreanCulture() throws Exception {
        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();
        koreanCulture.setId(count.incrementAndGet());

        // Create the KoreanCulture
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(koreanCulture);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKoreanCultureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKoreanCulture() throws Exception {
        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();
        koreanCulture.setId(count.incrementAndGet());

        // Create the KoreanCulture
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(koreanCulture);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKoreanCultureMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKoreanCultureWithPatch() throws Exception {
        // Initialize the database
        koreanCultureRepository.saveAndFlush(koreanCulture);

        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();

        // Update the koreanCulture using partial update
        KoreanCulture partialUpdatedKoreanCulture = new KoreanCulture();
        partialUpdatedKoreanCulture.setId(koreanCulture.getId());

        partialUpdatedKoreanCulture.titleRu(UPDATED_TITLE_RU).titleKr(UPDATED_TITLE_KR).contentUz(UPDATED_CONTENT_UZ);

        restKoreanCultureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKoreanCulture.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKoreanCulture))
            )
            .andExpect(status().isOk());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
        KoreanCulture testKoreanCulture = koreanCultureList.get(koreanCultureList.size() - 1);
        assertThat(testKoreanCulture.getTitleUz()).isEqualTo(DEFAULT_TITLE_UZ);
        assertThat(testKoreanCulture.getTitleRu()).isEqualTo(UPDATED_TITLE_RU);
        assertThat(testKoreanCulture.getTitleKr()).isEqualTo(UPDATED_TITLE_KR);
        assertThat(testKoreanCulture.getContentUz()).isEqualTo(UPDATED_CONTENT_UZ);
        assertThat(testKoreanCulture.getContentRu()).isEqualTo(DEFAULT_CONTENT_RU);
        assertThat(testKoreanCulture.getContentKr()).isEqualTo(DEFAULT_CONTENT_KR);
    }

    @Test
    @Transactional
    void fullUpdateKoreanCultureWithPatch() throws Exception {
        // Initialize the database
        koreanCultureRepository.saveAndFlush(koreanCulture);

        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();

        // Update the koreanCulture using partial update
        KoreanCulture partialUpdatedKoreanCulture = new KoreanCulture();
        partialUpdatedKoreanCulture.setId(koreanCulture.getId());

        partialUpdatedKoreanCulture
            .titleUz(UPDATED_TITLE_UZ)
            .titleRu(UPDATED_TITLE_RU)
            .titleKr(UPDATED_TITLE_KR)
            .contentUz(UPDATED_CONTENT_UZ)
            .contentRu(UPDATED_CONTENT_RU)
            .contentKr(UPDATED_CONTENT_KR);

        restKoreanCultureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKoreanCulture.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKoreanCulture))
            )
            .andExpect(status().isOk());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
        KoreanCulture testKoreanCulture = koreanCultureList.get(koreanCultureList.size() - 1);
        assertThat(testKoreanCulture.getTitleUz()).isEqualTo(UPDATED_TITLE_UZ);
        assertThat(testKoreanCulture.getTitleRu()).isEqualTo(UPDATED_TITLE_RU);
        assertThat(testKoreanCulture.getTitleKr()).isEqualTo(UPDATED_TITLE_KR);
        assertThat(testKoreanCulture.getContentUz()).isEqualTo(UPDATED_CONTENT_UZ);
        assertThat(testKoreanCulture.getContentRu()).isEqualTo(UPDATED_CONTENT_RU);
        assertThat(testKoreanCulture.getContentKr()).isEqualTo(UPDATED_CONTENT_KR);
    }

    @Test
    @Transactional
    void patchNonExistingKoreanCulture() throws Exception {
        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();
        koreanCulture.setId(count.incrementAndGet());

        // Create the KoreanCulture
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(koreanCulture);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKoreanCultureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, koreanCultureDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKoreanCulture() throws Exception {
        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();
        koreanCulture.setId(count.incrementAndGet());

        // Create the KoreanCulture
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(koreanCulture);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKoreanCultureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKoreanCulture() throws Exception {
        int databaseSizeBeforeUpdate = koreanCultureRepository.findAll().size();
        koreanCulture.setId(count.incrementAndGet());

        // Create the KoreanCulture
        KoreanCultureDTO koreanCultureDTO = koreanCultureMapper.toDto(koreanCulture);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKoreanCultureMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(koreanCultureDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KoreanCulture in the database
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKoreanCulture() throws Exception {
        // Initialize the database
        koreanCultureRepository.saveAndFlush(koreanCulture);

        int databaseSizeBeforeDelete = koreanCultureRepository.findAll().size();

        // Delete the koreanCulture
        restKoreanCultureMockMvc
            .perform(delete(ENTITY_API_URL_ID, koreanCulture.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KoreanCulture> koreanCultureList = koreanCultureRepository.findAll();
        assertThat(koreanCultureList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
