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
import uz.tashkec.domain.Partner;
import uz.tashkec.repository.PartnerRepository;
import uz.tashkec.service.dto.PartnerDTO;
import uz.tashkec.service.mapper.PartnerMapper;

/**
 * Integration tests for the {@link PartnerResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PartnerResourceIT {

    private static final String DEFAULT_TITLE_UZ = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_UZ = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_RU = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_RU = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_KR = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_KR = "BBBBBBBBBB";

    private static final String DEFAULT_WEB_URL = "AAAAAAAAAA";
    private static final String UPDATED_WEB_URL = "BBBBBBBBBB";

    private static final String DEFAULT_YOUTUBE_URL = "AAAAAAAAAA";
    private static final String UPDATED_YOUTUBE_URL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/partners";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private PartnerMapper partnerMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPartnerMockMvc;

    private Partner partner;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Partner createEntity(EntityManager em) {
        Partner partner = new Partner()
            .titleUz(DEFAULT_TITLE_UZ)
            .titleRu(DEFAULT_TITLE_RU)
            .titleKr(DEFAULT_TITLE_KR)
            .webUrl(DEFAULT_WEB_URL)
            .youtubeUrl(DEFAULT_YOUTUBE_URL);
        return partner;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Partner createUpdatedEntity(EntityManager em) {
        Partner partner = new Partner()
            .titleUz(UPDATED_TITLE_UZ)
            .titleRu(UPDATED_TITLE_RU)
            .titleKr(UPDATED_TITLE_KR)
            .webUrl(UPDATED_WEB_URL)
            .youtubeUrl(UPDATED_YOUTUBE_URL);
        return partner;
    }

    @BeforeEach
    public void initTest() {
        partner = createEntity(em);
    }

    @Test
    @Transactional
    void createPartner() throws Exception {
        int databaseSizeBeforeCreate = partnerRepository.findAll().size();
        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);
        restPartnerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partnerDTO)))
            .andExpect(status().isCreated());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeCreate + 1);
        Partner testPartner = partnerList.get(partnerList.size() - 1);
        assertThat(testPartner.getTitleUz()).isEqualTo(DEFAULT_TITLE_UZ);
        assertThat(testPartner.getTitleRu()).isEqualTo(DEFAULT_TITLE_RU);
        assertThat(testPartner.getTitleKr()).isEqualTo(DEFAULT_TITLE_KR);
        assertThat(testPartner.getWebUrl()).isEqualTo(DEFAULT_WEB_URL);
        assertThat(testPartner.getYoutubeUrl()).isEqualTo(DEFAULT_YOUTUBE_URL);
    }

    @Test
    @Transactional
    void createPartnerWithExistingId() throws Exception {
        // Create the Partner with an existing ID
        partner.setId(1L);
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        int databaseSizeBeforeCreate = partnerRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartnerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partnerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPartners() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        // Get all the partnerList
        restPartnerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partner.getId().intValue())))
            .andExpect(jsonPath("$.[*].titleUz").value(hasItem(DEFAULT_TITLE_UZ)))
            .andExpect(jsonPath("$.[*].titleRu").value(hasItem(DEFAULT_TITLE_RU)))
            .andExpect(jsonPath("$.[*].titleKr").value(hasItem(DEFAULT_TITLE_KR)))
            .andExpect(jsonPath("$.[*].webUrl").value(hasItem(DEFAULT_WEB_URL)))
            .andExpect(jsonPath("$.[*].youtubeUrl").value(hasItem(DEFAULT_YOUTUBE_URL)));
    }

    @Test
    @Transactional
    void getPartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        // Get the partner
        restPartnerMockMvc
            .perform(get(ENTITY_API_URL_ID, partner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(partner.getId().intValue()))
            .andExpect(jsonPath("$.titleUz").value(DEFAULT_TITLE_UZ))
            .andExpect(jsonPath("$.titleRu").value(DEFAULT_TITLE_RU))
            .andExpect(jsonPath("$.titleKr").value(DEFAULT_TITLE_KR))
            .andExpect(jsonPath("$.webUrl").value(DEFAULT_WEB_URL))
            .andExpect(jsonPath("$.youtubeUrl").value(DEFAULT_YOUTUBE_URL));
    }

    @Test
    @Transactional
    void getNonExistingPartner() throws Exception {
        // Get the partner
        restPartnerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();

        // Update the partner
        Partner updatedPartner = partnerRepository.findById(partner.getId()).get();
        // Disconnect from session so that the updates on updatedPartner are not directly saved in db
        em.detach(updatedPartner);
        updatedPartner
            .titleUz(UPDATED_TITLE_UZ)
            .titleRu(UPDATED_TITLE_RU)
            .titleKr(UPDATED_TITLE_KR)
            .webUrl(UPDATED_WEB_URL)
            .youtubeUrl(UPDATED_YOUTUBE_URL);
        PartnerDTO partnerDTO = partnerMapper.toDto(updatedPartner);

        restPartnerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, partnerDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(partnerDTO))
            )
            .andExpect(status().isOk());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
        Partner testPartner = partnerList.get(partnerList.size() - 1);
        assertThat(testPartner.getTitleUz()).isEqualTo(UPDATED_TITLE_UZ);
        assertThat(testPartner.getTitleRu()).isEqualTo(UPDATED_TITLE_RU);
        assertThat(testPartner.getTitleKr()).isEqualTo(UPDATED_TITLE_KR);
        assertThat(testPartner.getWebUrl()).isEqualTo(UPDATED_WEB_URL);
        assertThat(testPartner.getYoutubeUrl()).isEqualTo(UPDATED_YOUTUBE_URL);
    }

    @Test
    @Transactional
    void putNonExistingPartner() throws Exception {
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();
        partner.setId(count.incrementAndGet());

        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartnerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, partnerDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(partnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPartner() throws Exception {
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();
        partner.setId(count.incrementAndGet());

        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPartnerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(partnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPartner() throws Exception {
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();
        partner.setId(count.incrementAndGet());

        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPartnerMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(partnerDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePartnerWithPatch() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();

        // Update the partner using partial update
        Partner partialUpdatedPartner = new Partner();
        partialUpdatedPartner.setId(partner.getId());

        partialUpdatedPartner.titleRu(UPDATED_TITLE_RU).titleKr(UPDATED_TITLE_KR).webUrl(UPDATED_WEB_URL);

        restPartnerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPartner.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPartner))
            )
            .andExpect(status().isOk());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
        Partner testPartner = partnerList.get(partnerList.size() - 1);
        assertThat(testPartner.getTitleUz()).isEqualTo(DEFAULT_TITLE_UZ);
        assertThat(testPartner.getTitleRu()).isEqualTo(UPDATED_TITLE_RU);
        assertThat(testPartner.getTitleKr()).isEqualTo(UPDATED_TITLE_KR);
        assertThat(testPartner.getWebUrl()).isEqualTo(UPDATED_WEB_URL);
        assertThat(testPartner.getYoutubeUrl()).isEqualTo(DEFAULT_YOUTUBE_URL);
    }

    @Test
    @Transactional
    void fullUpdatePartnerWithPatch() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();

        // Update the partner using partial update
        Partner partialUpdatedPartner = new Partner();
        partialUpdatedPartner.setId(partner.getId());

        partialUpdatedPartner
            .titleUz(UPDATED_TITLE_UZ)
            .titleRu(UPDATED_TITLE_RU)
            .titleKr(UPDATED_TITLE_KR)
            .webUrl(UPDATED_WEB_URL)
            .youtubeUrl(UPDATED_YOUTUBE_URL);

        restPartnerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPartner.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPartner))
            )
            .andExpect(status().isOk());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
        Partner testPartner = partnerList.get(partnerList.size() - 1);
        assertThat(testPartner.getTitleUz()).isEqualTo(UPDATED_TITLE_UZ);
        assertThat(testPartner.getTitleRu()).isEqualTo(UPDATED_TITLE_RU);
        assertThat(testPartner.getTitleKr()).isEqualTo(UPDATED_TITLE_KR);
        assertThat(testPartner.getWebUrl()).isEqualTo(UPDATED_WEB_URL);
        assertThat(testPartner.getYoutubeUrl()).isEqualTo(UPDATED_YOUTUBE_URL);
    }

    @Test
    @Transactional
    void patchNonExistingPartner() throws Exception {
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();
        partner.setId(count.incrementAndGet());

        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartnerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partnerDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPartner() throws Exception {
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();
        partner.setId(count.incrementAndGet());

        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPartnerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPartner() throws Exception {
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();
        partner.setId(count.incrementAndGet());

        // Create the Partner
        PartnerDTO partnerDTO = partnerMapper.toDto(partner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPartnerMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(partnerDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        int databaseSizeBeforeDelete = partnerRepository.findAll().size();

        // Delete the partner
        restPartnerMockMvc
            .perform(delete(ENTITY_API_URL_ID, partner.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
